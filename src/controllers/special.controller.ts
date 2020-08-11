import {Request, Response} from 'express'

export const specialController = (req: Request, res: Response) => {
    const email = req.body.email;
    return res.json({ message: `Hola, ${email}, estás autenticado!` });
};