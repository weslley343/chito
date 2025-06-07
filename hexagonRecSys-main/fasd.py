from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, text
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv
import os

# Carregar variáveis de ambiente
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

app = FastAPI()

class QueryParams(BaseModel):
    client: int
    avaliationid: int

# retorna avaliationid, client, questionid, score, created_at []
def fetch_answers(client, avaliationid):
    query = """
    WITH answers_cte AS (
        SELECT
            a.id AS avaliationid,
            a.client_fk,
            q.id AS questionid,
            i.score,
            a.created_at AS timestamp
        FROM avaliations a
        INNER JOIN answers ans ON a.id = ans.avaliation_fk
        INNER JOIN itens i ON i.id = ans.item_fk
        INNER JOIN questions q ON q.id = ans.question_fk
    )
    SELECT * FROM answers_cte
    WHERE client_fk != :client OR avaliationid = :avaliationid;
    """
    params = {'client': client, 'avaliationid': avaliationid}
    with engine.connect() as connection:
        result = connection.execute(text(query), params)
        return pd.DataFrame(result.fetchall(), columns=result.keys())

def fetch_questions():
    query = """
    SELECT q.id AS questionid, q.item_order, q.content, q.domain
    FROM questions q;
    """
    with engine.connect() as connection:
        result = connection.execute(text(query))
        return pd.DataFrame(result.fetchall(), columns=result.keys())

def fetch_evaluation_details(avaliation_id, client):
    query = """
    SELECT
        a.id AS avaliationid,
        a.client_fk,
        q.id AS questionid,
        i.score,
        a.created_at AS timestamp
    FROM avaliations a
    INNER JOIN answers ans ON a.id = ans.avaliation_fk
    INNER JOIN itens i ON i.id = ans.item_fk
    INNER JOIN questions q ON q.id = ans.question_fk
    WHERE a.id > :avaliation_id AND a.client_fk = :client
    LIMIT 77;
    """ #77 provavelmente deve mudar para comportar outros testes pois 77 [é o número de perguntas para a ATEC]
    params = {'client': client, 'avaliation_id': avaliation_id}
    with engine.connect() as connection:
        result = connection.execute(text(query), params)
        return pd.DataFrame(result.fetchall(), columns=result.keys())

#verifica a relação entre o client e a avaliação -> Retorna (title, notes, client_fk, professional_fk, scale_fk, created_at)
def query_relation(client, avaliationid):
    query = """
    SELECT * FROM avaliations
    WHERE client_fk = :client AND id = :avaliationid;
    """
    params = {'client': client, 'avaliationid': avaliationid}
    with engine.connect() as connection:
        result = connection.execute(text(query), params)
        return pd.DataFrame(result.fetchall(), columns=result.keys())

@app.get("/sugest")
async def recommend_questions_route(avaliation: int, client: str):
    avaliationid = avaliation

    avaliation = query_relation(client, avaliationid) # Verifica a relação entre o client e a avaliação
    if avaliation.empty:
        raise HTTPException(status_code=404, detail="Avaliação não encontrada")

    df_primary_answers = fetch_answers(client=client, avaliationid=avaliationid) # retorna as respostas de um usuário
    df_questions = fetch_questions()

    pivot_table = df_primary_answers.pivot_table(index='avaliationid', columns='questionid', values='score', fill_value=0)
    matrix = pivot_table.values
    similarity_matrix = cosine_similarity(matrix)
    similarity_df = pd.DataFrame(similarity_matrix, index=pivot_table.index, columns=pivot_table.index)

    similarity_scores = similarity_df.loc[avaliationid]
    top_similarities = similarity_scores.sort_values(ascending=False).head(5)
    top_similarities = top_similarities.drop(avaliationid, errors='ignore')
    similar_ids = top_similarities.index.tolist()

    clients_df = df_primary_answers[['avaliationid', 'client_fk']].drop_duplicates()
    clients_df = clients_df.set_index('avaliationid')
    similar_clients = clients_df.loc[similar_ids]

    results_list = []
    for similar_client in similar_clients.itertuples():
        evaluation_details = fetch_evaluation_details(similar_client.Index, similar_client.client_fk)
        if not evaluation_details.empty:
            results_list.append(evaluation_details)

    if results_list:
        combined_results = pd.concat(results_list, ignore_index=True)
        pivot_table_2 = combined_results.pivot_table(index='avaliationid', columns='questionid', values='score', fill_value=0)
        mean_scores = pivot_table_2.mean()
        evaluation_of_interest = df_primary_answers[df_primary_answers['avaliationid'] == avaliationid]
        pivot_avaliation_of_interest = evaluation_of_interest.pivot_table(index='avaliationid', columns='questionid', values='score', fill_value=0)
        evaluation_series = pivot_avaliation_of_interest.loc[avaliationid].squeeze()
        differences = mean_scores - evaluation_series
        filtered_differences = differences[differences < 0]
        sorted_filtered_differences = filtered_differences.sort_values(ascending=True)
        filtered_questions = df_questions[df_questions['questionid'].isin(sorted_filtered_differences.index)]
        return {"filtered_questions": filtered_questions.to_dict(orient='records')}
    else:
        return {"message": "Nenhum dado retornado para as avaliações similares."}
