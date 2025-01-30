import { NextFunction, Request, Response } from "express";
const jwt = require('jsonwebtoken');

export async function ProfessionalMiddleware(request: Request, response: Response, next: NextFunction) {
    const auth = request.headers.authorization;

    if (!auth) {
        response.status(401).json({ message: 'No Auth Found' });
        return
    }

    const [authType, authValue] = auth.split(' ');

    if (authType !== 'Bearer' || !authValue) {
        response.status(401).json({ message: 'Invalid Auth Type or No Auth Value' });
        return
    }
    

    jwt.verify(authValue, process.env.SECRET_JWT, (err: Error, decoded: any) => {
        if (err) {
            console.log(err)
            return response.status(401).json({ message: 'Invalid Token' });
        }

        if (String(decoded.token) === 'acetoken' && String(decoded.type) === 'professional') {
            response.locals.id = decoded.id;
            return next();
        }

        return response.status(401).json({ message: 'No Privileges' });
    });
}
