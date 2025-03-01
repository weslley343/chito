import { modelScalesDetailById, modelScalesList } from "../model/scales";
import { Request, Response } from 'express';

export const controllerScalesList = async (req: Request, res: Response) => {
    const scalelist = await modelScalesList();
    res.status(200).json(scalelist);
};

export const controllerScalesDetail = async (req: Request, res: Response) => {

    const { id } = req.params;
    const scalelist = await modelScalesDetailById(parseInt(id));
    res.status(200).json(scalelist);
};