import { Request, Response } from 'express';
import { prisma } from '../utils/prisma';
import { Prisma } from '@prisma/client';
import { DatabaseError } from '../utils/erros';
export interface DomainScore {
    domain: string;
    pontuation: string;
    color?: string;
};

interface Evolution {
    evolution: DomainScoreAlt[];
}

interface DomainScoreAlt {
    domain: string;
    color: string;
    score: number[];
}

interface RawResult {
    id: number;
    domain: string;
    color: string;
    score_total: string;
    created_at: string;
}

interface Evaluation {
    id: number;
    title: string;
    created_at: string;
    domains: DomainScore[];
}

export const toBeImplemented = async (req: Request, res: Response) => {

    res.status(201).json({ "msg": "this path will be implemented soon" });
};

export const listAvaliationsByClientIdAndScaleId = async (req: Request, res: Response) => {
    const {
        client, scale
    } = req.params;

    // Query segura com parâmetros
    const result = await prisma.$queryRaw<{
        id: number;
        title: string;
        domain: string;
        color: string;
        pontuation: string;
        created_at: string;
    }[]>(Prisma.sql`
      SELECT 
            avaliations.id, 
            avaliations.title, 
            questions.domain,
            questions.color,
            avaliations.created_at,
            SUM(itens.score) AS pontuation 
        FROM answers 
        INNER JOIN avaliations ON answers.avaliation_fk = avaliations.id 
        INNER JOIN questions ON answers.question_fk = questions.id 
        INNER JOIN itens ON answers.item_fk = itens.id 
        WHERE avaliations.client_fk = ${Prisma.sql`${client}::uuid`} and avaliations.scale_fk = ${Number(scale)}
        GROUP BY avaliations.id, avaliations.title, questions.domain, questions.color, avaliations.created_at
        ORDER BY avaliations.created_at desc
    `);

    if (!result || result.length === 0) {
        res.status(400).json({ "error": "No evaluations found for the given client and scale." });
        return;
    }

    const combinedResult: { [key: number]: Evaluation } = {};

    for (const cur of result) {
        const { id, title, domain, pontuation, color, created_at } = cur;
        if (!combinedResult[id]) {
            combinedResult[id] = {
                id,
                title,
                created_at,
                domains: [{ domain, pontuation, color }]
            };
        } else {
            combinedResult[id].domains.push({ domain, pontuation, color });
        }
    }

    const combinedArray = Object.values(combinedResult);

    combinedArray.sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    res.status(200).json(combinedArray);
};

export const listEvolutionByDomain = async (req: Request, res: Response) => {

    const {
        client, scale
    } = req.params;

    const result: RawResult[] = await prisma.$queryRaw`
            SELECT 
                avaliations.id, 
                questions.domain,
                questions.color,
                SUM(itens.score) AS score_total, 
                avaliations.created_at 
            FROM clients
            INNER JOIN avaliations ON avaliations.client_fk  = clients.id 
            INNER JOIN answers ON answers.avaliation_fk  = avaliations.id 
            INNER JOIN questions ON answers.question_fk  = questions.id 
            INNER JOIN itens ON answers.item_fk  = itens.id 
            WHERE clients.id = ${Prisma.sql`${client}::uuid`} and avaliations.scale_fk = ${Number(scale)}
            GROUP BY avaliations.id, questions.domain, avaliations.created_at, questions.color
            ORDER BY avaliations.created_at ASC
            --LIMIT 40;
        `;

    if (!result || result.length === 0) {
        throw new Error("Could not retrieve data from the database");
    }

    // Transform the result into the desired format
    const groupedResults = result.reduce<{ [key: string]: DomainScoreAlt }>((acc, cur) => {
        const { domain: domain, color, score_total } = cur;
        if (!acc[domain]) {
            acc[domain] = {
                domain: domain,
                color: color,
                score: []
            };
        }
        acc[domain].score.push(parseFloat(score_total));
        return acc;
    }, {});

    res.status(200).json(Object.values(groupedResults));
};

export const DetailAvaliationById = async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);

    // const result = await prisma.avaliations.findUnique({
    //     where: {
    //         id: Number(id)
    //     },
    //     include: {
    //         answers: {
    //             include: {
    //                 questions: true,
    //                 itens: true
    //             }
    //         },
    //         clients: true,
    //         scales: true
    //     }
    // });

    // if (!result) {
    //     throw new Error("Avaliation not found");
    // }

    // res.status(200).json(result);


    const result = await prisma.$queryRaw`
    select questions.item_order, questions.content, itens.content as answer, questions.domain, questions.color, itens.score  from avaliations inner join answers on avaliations.id = answers.avaliation_fk inner join questions on questions.id = answers.question_fk inner join itens on answers.item_fk = itens.id where avaliations.id = ${id} order by questions.item_order;
        `

    if (!result) {
        throw new DatabaseError("Could not retrieve data from the database");
    }
    res.status(200).json(result);

}