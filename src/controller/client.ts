import { Request, Response } from 'express';
import { modelClientCreate, } from '../model/client';
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
    const client = await modelClientCreate(identifier, randomCode(7), full_name, birthdate, gender, description, id);
    res.status(201).json(client);
};
