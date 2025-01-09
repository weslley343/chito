import { Request, Response } from 'express';
import { create as createProfessional } from '../model/professional';

export const create = async (req: Request, res: Response) => {
    const { identifier, full_name, password, description, email, specialty } = req.body;
    const professional = await createProfessional(identifier, full_name, password, description, email, specialty);
    res.status(201).json(professional);
};