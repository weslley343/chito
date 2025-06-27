import { Request, Response, NextFunction } from 'express'
import { Prisma } from '@prisma/client'
import { AcessDeniedError, DatabaseError, DomainLogicError, InteralServerError, RequestError } from './erros'

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log(error)
            res.status(500).json({
                "msg": "Database Error."
            })
        } else if (error instanceof InteralServerError) {
            res.status(error.statusCode).json({
                "msg": error.message
            })
        } else if (error instanceof AcessDeniedError) {
            res.status(error.statusCode).json({
                "msg": error.message
            })
        } else if (error instanceof RequestError) {
            res.status(error.statusCode).json({
                "msg": error.message,
                "errors": error.errors.array()
            })
        } else if (error instanceof DomainLogicError) {
            res.status(error.statusCode).json({
                "msg": error.message
            })
        } else if (error instanceof DatabaseError) {
            res.status(error.statusCode).json({
                "msg": error.message
            })
        } else {
            console.log('\n Error middleware ʕノ•ᴥ•ʔノ ︵ ┻━┻\n', error)
            return res.status(400).json({ "error": "could not fetch data" })
        }
    }
}
