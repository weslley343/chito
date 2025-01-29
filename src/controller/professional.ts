import { Request, Response } from 'express';
import { modelProfessionalCreate, modelProfessionalSignin } from '../model/professional';
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