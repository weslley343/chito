import { modelScalesDetailById, modelScalesList } from "../model/scales";
import { Request, Response } from 'express';
import { prisma } from "../utils/prisma";
import { DatabaseError, DomainLogicError } from "../utils/erros";
import { Prisma } from "@prisma/client";

export interface AreaScore {
    area: string;
    pontuation: string;
};

interface AreaScoreAlt {
    area: string;
    score: number[];
}

interface Evaluation {
    id: number;
    title: string;
    created_at: string;
    areas: AreaScore[];
}

// Listar todas as escalas
export const controllerScalesList = async (req: Request, res: Response) => {
    const scalelist = await modelScalesList();
    res.status(200).json(scalelist);
};

// Listar detalhes de uma escala (questionário e intens)
export const controllerScalesDetail = async (req: Request, res: Response) => {

    const { id } = req.params;
    const scalelist = await modelScalesDetailById(parseInt(id));
    res.status(200).json(scalelist);
};

//A lógica do submit é um pouco compexa, e exige funções na model que não estão preparadas.
//Vou deixar implementações da model aqui para formar a prova de conceito e mudo depois.
// TODO: Transferir o código para as respectivas models

//submeter o formulário ---------------------------------------------------------------------------------------------------------------------
export const controllerScalesSubmit = async (req: Request, res: Response) => {
    //coleta o id do profissional
    //coleta o id do paciente
    //verificar relação entre os dois
    const { client, title, notes, answers, scale } = req.body
    const id: string = res.locals.id
    const relation = await prisma.client_professional.findMany({ where: { professional_fk: id, client_fk: client } })
    if (!relation) {
        throw new DatabaseError("Coud'not recover data of relation");
    }

    // confere o tamanho do questionario
    const count = await prisma.questions.count({
        where: {
            scale_fk: scale, // Filter by scale_fk = 1
        },
        select: {
            content: true, // Count only rows where `content` is not null
        },
    });

    console.log(count.content);
    if (count.content != answers.length) {
        throw new DomainLogicError("Scale needs do be fully filled")
    }


    const test_submission = await prisma.avaliations.create({
        data: {
            scale_fk: scale,
            title: title,
            notes: notes,
            client_fk: client,
            professional_fk: id,
            answers: {
                create: answers.map((answer: any) => ({
                    question_fk: answer.question, // Ensure this is provided in the `answers` array
                    item_fk: answer.item, // Ensure this is provided in the `answers` array
                })),
            }
        },
    })
    if (!test_submission) {
        throw new DatabaseError("falha ao submeter o formulário");

    }
    res.json(test_submission).status(200)
};

//resultado da última avaliação do cliente -------------------------------------------------------------------------------------------------------------
export const getResultByLastAvaliationOfUser = async (req: Request, res: Response) => {
    const { client } = req.params;
    const result = await prisma.$queryRaw`
  SELECT 
    q."domain", 
    SUM(i."score") AS total_score
  FROM "answers" a
  JOIN "itens" i ON i.id = a."item_fk"
  JOIN "questions" q ON q.id = a."question_fk"
  JOIN "avaliations" av ON av.id = a."avaliation_fk"
  WHERE av."client_fk" = ${Prisma.sql`CAST(${client} AS UUID)`}  -- Cast explícito para UUID
  AND av."created_at" = (
    SELECT MAX("created_at") FROM "avaliations" WHERE "client_fk" = ${Prisma.sql`CAST(${client} AS UUID)`}  -- Cast explícito aqui também
  )
  GROUP BY q."domain";
`;


    if (!result) {
        throw new DatabaseError("Could not retrieve data from the database");
    }
    res.json(result).status(200)
}

// Listar evolução por área
// export const listEvolutionbyArea = async (req: Request, res: Response) => {
//     const { client } = req.params;
//     const result = await prisma.$queryRaw`
//   SELECT 
//     q."domain", 
//     i."score"
//   FROM "answers" a
//   JOIN "itens" i ON i.id = a."item_fk"
//   JOIN "questions" q ON q.id = a."question_fk"
//   JOIN "avaliations" av ON av.id = a."avaliation_fk"
//   WHERE av."client_fk" = ${Prisma.sql`CAST(${client} AS UUID)`}  -- Cast explícito para UUID
//   GROUP BY q."domain", i."score";
// `;

//     if (!result) {
//         throw new DatabaseError("Could not retrieve data from the database");
//     }
//     res.json(result).status(200)
// }

export const listEvolutionbyArea = async (req: Request, res: Response) => {
    const { client } = req.params;

    const rawResult = await prisma.$queryRaw<{ domain: string; score_total: string }[]>`
        SELECT 
                avaliations.id, 
                questions.domain, 
                SUM(itens.score) AS score_total, 
                avaliations.created_at 
            FROM clients 
            INNER JOIN avaliations ON avaliations.client_fk = clients.id 
            INNER JOIN answers ON answers.avaliation_fk = avaliations.id 
            INNER JOIN questions ON answers.question_fk = questions.id 
            INNER JOIN itens ON answers.item_fk = itens.id 
            WHERE clients.id = ${Prisma.sql`CAST(${client} AS UUID)`}
            GROUP BY avaliations.id, questions.domain, avaliations.created_at 
            ORDER BY avaliations.created_at ASC
            --LIMIT 40;
      `;

    if (!rawResult || rawResult.length === 0) {
        throw new Error("Could not retrieve data from the database");
    }

    // Transform the result into the desired format
    const groupedResults = rawResult.reduce<{ [key: string]: AreaScoreAlt }>((acc, cur) => {
        const { domain, score_total } = cur;
        if (!acc[domain]) {
            acc[domain] = {
                area: domain,
                score: []
            };
        }
        acc[domain].score.push(parseFloat(score_total));
        return acc;
    }, {});

    res.json(Object.values(groupedResults)).status(200)
};
