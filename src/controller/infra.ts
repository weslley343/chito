import { Request, Response } from 'express';

export const toBeImplemented = async (req: Request, res: Response) => {

    res.status(201).json({ "msg": "this path will be implemented soon" });
};