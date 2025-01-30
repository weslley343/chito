
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { ResponsibleMiddleware } from '../utils/middlewares/Responsible';
import validateRequest from '../utils/validateRequest';
import { resolver } from '../utils/routeAdapters';

const relationRoutes = Router()

relationRoutes.post('/specialist',
    [
        body("code").isString(),
        body("identifier").isString(),
        validateRequest,
        //SpecialistMiddleware,
    ],
    resolver(toBeImplemented))
relationRoutes.post('/guardian',
    [
        body("code").isString(),
        body("identifier").isString(),
        validateRequest,
        ResponsibleMiddleware,
    ],
    resolver(toBeImplemented))
relationRoutes.delete('/specialist',
    [
        body("client").isString(),
        validateRequest,
        //SpecialistMiddleware,
    ],
    resolver(toBeImplemented))
relationRoutes.delete('/guaridan',
    [
        body("client").isString(),
        validateRequest,
        ResponsibleMiddleware,
    ],
      resolver(toBeImplemented))

export default relationRoutes