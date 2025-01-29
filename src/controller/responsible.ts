import { Request, Response } from 'express';
import { modelResponsibleCreate, modelResponsibleSignin } from '../model/responsible';
import { encryptPassword } from '../utils/encriptor';

export const controllerResponsibleCreate = async (req: Request, res: Response) => {
    const { identifier, full_name, password, description, email } = req.body;
    const responsible = await modelResponsibleCreate(identifier, full_name, encryptPassword(password), description, email);
    res.status(201).json({
        "id": responsible.id,
        "identifier": responsible.identifier,
        "full_name": responsible.full_name,
        "description": responsible.description,
        "email": responsible.email,
        "created_at": responsible.created_at
    });
};

export const controllerResponsibleSignin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await modelResponsibleSignin(password, email);
    res.json(result).status(200);
};