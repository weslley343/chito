import { modelScalesDetailById, modelScalesList } from "../model/scales";
import { Request, Response } from 'express';
import { prisma } from "../utils/prisma";
import { DatabaseError } from "../utils/erros";
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
    const relation = await prisma.client_professional.findMany({ where: { professional_fk: id, client_fk: client} })
    if (!relation) {
        throw new DatabaseError("Coud'not recover data of relation");
    }

    // confere o tamanho do questionario
    //coleta o id do teste
    //coleta o id da consulta
    //coleta o id da escala
    //Insere os valores

    const parametros = {
        "scale": scale,
        "title": title,
        "notes": client,
        "client": notes,
        "answers": answers.length

    }


    //const scalelist = await modelScalesDetailById(parseInt(id));
    res.status(200).json({ "teste": relation });
};