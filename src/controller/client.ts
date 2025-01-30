import { Request, Response } from 'express';
import { ClientCreate, clientDelete, } from '../model/client';
import { encryptPassword } from '../utils/encriptor';
import { randomCode } from '../utils/randomCode';

export const controllerClientCreate = async (req: Request, res: Response) => {
    const {
        identifier,
        full_name,
        birthdate,
        gender,
        description
    } = req.body;
    const id = res.locals.id
    const client = await ClientCreate(identifier, randomCode(7), full_name, birthdate, gender, description, id);
    res.status(201).json(client);
};

export const controllerClientDelete = async (req: Request, res: Response) => {
    const {
        clientid
    } = req.params;
    const id = res.locals.id
    console.log(clientid, id)
    const client = await clientDelete(clientid, id);
    res.status(200).json(client);
};