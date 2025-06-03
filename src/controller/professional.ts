import { Request, Response } from 'express';
import { getProfessionalByClientId, modelProfessionalCreate, modelProfessionalDelete, modelProfessionalSignin } from '../model/professional';
import { encryptPassword } from '../utils/encriptor';

export const controllerProfessionalCreate = async (req: Request, res: Response) => {
    const { identifier, full_name, password, description, email, specialty } = req.body;
    const professional = await modelProfessionalCreate(identifier, full_name, encryptPassword(password), description, email, specialty);
    res.status(201).json({
        "id": professional.id,
        "identifier": professional.identifier,
        "full_name": professional.full_name,
        "description": professional.description,
        "email": professional.email,
        "specialty": professional.specialty,
        "created_at": professional.created_at
    });
};

export const controllerProfessionalSignin = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    const result = await modelProfessionalSignin(password, email);
    res.json(result).status(200);
};

export const controllerProfessionalDelete = async (req: Request, res: Response) => {
    const id = res.locals.id;
    const professional = await modelProfessionalDelete(id);
    res.status(200).json({
        "id": professional.id,
        "identifier": professional.identifier,
        "full_name": professional.full_name,
        "description": professional.description,
        "email": professional.email,
        "specialty": professional.specialty,
        "created_at": professional.created_at
    });
};

export const controllerGetByClient = async (req: Request, res: Response) => {

    const id = res.locals.id
    const { skip, take, client} = req.query;
    const result = await getProfessionalByClientId(parseInt(skip as string), parseInt(take as string), client+"");
    res.json(result).status(200)

}