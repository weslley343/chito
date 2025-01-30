import { Request, Response } from 'express';
import { modelClientGuardianCreate } from '../model/relation';
import { getClientById } from '../model/client';
import { DomainLogicError } from '../utils/erros';

export const controllerClientCreate = async (req: Request, res: Response) => {
    const { clientId, code } = req.body;
    const id = res.locals.id

    //verificar se o cliente existe e tem o codigo valido
    const client = await getClientById(clientId);
    if (client.code != code) {
        throw new DomainLogicError("código não compatível")
    }

    const relation = await modelClientGuardianCreate(clientId, id)
    res.status(201).json(relation);
};
