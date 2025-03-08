import { modelScalesDetailById, modelScalesList } from "../model/scales";
import { Request, Response } from 'express';
import { prisma } from "../utils/prisma";
import { DatabaseError, DomainLogicError } from "../utils/erros";
import { UUIDVersion } from "express-validator/lib/options";
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