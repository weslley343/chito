import { Request, Response } from 'express';
import { modelClientProfessionalCreate, modelClientResponsibleDelete, modelClientResponsibleCreate, modelClientProfessionalDelete } from '../model/relation';
import { getClientByIdentifier } from '../model/client';
import { DomainLogicError } from '../utils/erros';

export const controllerClientResponsibleCreate = async (req: Request, res: Response) => {
    const { identifier, code } = req.body;
    const id = res.locals.id

    //verificar se o cliente existe e tem o codigo valido
    const client = await getClientByIdentifier(identifier);
    if (client.code != code) {
        throw new DomainLogicError("código não compatível")
    }

    const relation = await modelClientResponsibleCreate(client.id, id)
    res.status(201).json(relation);
};

export const controllerClientProfessionalCreate = async (req: Request, res: Response) => {
    const { identifier, code } = req.body;
    const id = res.locals.id

    //verificar se o cliente existe e tem o codigo valido
    const client = await getClientByIdentifier(identifier);
    if (client.code != code) {
        throw new DomainLogicError("código não compatível")
    }

    const relation = await modelClientProfessionalCreate(client.id, id)
    res.status(201).json(relation);
};

export const controllerClientProfessionalDelete = async (req: Request, res: Response) => {

    const { identifier } = req.body;
    const id = res.locals.id

    const client = await getClientByIdentifier(identifier);

    const relation = await modelClientProfessionalDelete(client.id, id)
    res.status(200).json(relation);
};

export const controllerClientResponsibleDelete = async (req: Request, res: Response) => {

    const { identifier } = req.body;
    const id = res.locals.id

    

    const client = await getClientByIdentifier(identifier);
    console.log(id, '----------', client.id)


    const relation = await modelClientResponsibleDelete(client.id, id)
    res.status(200).json(relation);
};