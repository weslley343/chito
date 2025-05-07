import { modelScalesDetailById, modelScalesList } from "../model/scales";
import { Request, Response } from 'express';
import { prisma } from "../utils/prisma";
import { DatabaseError, DomainLogicError } from "../utils/erros";
import { Prisma } from "@prisma/client";

export interface AreaScore {
    area: string;
    pontuation: string;
};

interface Evaluation {
    id: number;
    title: string;
    created_at: string;
    areas: AreaScore[];
}
export const controllerScalesList = async (req: Request, res: Response) => {
    const scalelist = await modelScalesList();
    res.status(200).json(scalelist);
};

export const controllerScalesDetail = async (req: Request, res: Response) => {

    const { id } = req.params;
    const scalelist = await modelScalesDetailById(parseInt(id));
    res.status(200).json(scalelist);
};

//A lógica do submit é um pouco compexa, e exige funções na model que não estão preparadas.
//Vou deixar implementações da model aqui para formar a prova de conceito e mudo depois.
// TODO: Transferir o código para as respectivas models

//*criar demo
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

export const listTestsByClientId = async (skip: number, take: number, client: number): Promise<Evaluation[]> => {
    const result: { id: number; title: string; area: string; pontuation: string, created_at: string }[] = await prisma.$queryRaw`
        SELECT 
            avaliation.id, 
            avaliation.title, 
            question.area,
            avaliation.created_at,
            SUM(item.score) AS pontuation 
        FROM answer 
        INNER JOIN avaliation ON answer.avaliation = avaliation.id 
        INNER JOIN question ON answer.question = question.id 
        INNER JOIN item ON answer.item = item.id 
        WHERE avaliation.client = ${client} 
        GROUP BY question.area, avaliation.id, avaliation.created_at
        ORDER BY avaliation.created_at desc
        
    `;
    //OFFSET ${skip} LIMIT ${take};

    if (!result || result.length === 0) {
        throw new Error("Could not retrieve data from the database");
    }

    // Combine the scores by evaluation ID and area
    // const combinedResult = result.reduce<{ [key: number]: Evaluation }>((acc, cur) => {
    //     const { id, title, area, pontuation, created_at } = cur;
    //     if (!acc[id]) {
    //         acc[id] = {
    //             id,
    //             title,
    //             created_at,
    //             areas: []
    //         };
    //     }
    //     acc[id].areas.push({ area, pontuation });
    //     return acc;
    // }, {});

    // // Convert the object back to an array
    // return Object.values(combinedResult);

    // Combine the scores by evaluation ID
    // Combine the scores by evaluation ID
    const combinedResult: { [key: number]: Evaluation } = {};

    for (const cur of result) {
        const { id, title, area, pontuation, created_at } = cur;
        if (!combinedResult[id]) {
            combinedResult[id] = {
                id,
                title,
                created_at,
                areas: [{ area, pontuation }]
            };
        } else {
            combinedResult[id].areas.push({ area, pontuation });
        }
    }

    // Convert the object back to an array
    const combinedArray = Object.values(combinedResult);

    // Sort the combined array by created_at in descending order
    combinedArray.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    return combinedArray;


};