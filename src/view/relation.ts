
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { ResponsibleMiddleware } from '../utils/middlewares/Responsible';
import validateRequest from '../utils/validateRequest';
import { resolver } from '../utils/routeAdapters';
import { ProfessionalMiddleware } from '../utils/middlewares/Specialist';
import { controllerClientProfessionalCreate, controllerClientProfessionalDelete, controllerClientResponsibleCreate, controllerClientResponsibleDelete } from '../controller/relation';

const relationRoutes = Router()

relationRoutes.post('/professional',
    [
        body("code").isString(),
        body("identifier").isString(),
        validateRequest,
        ProfessionalMiddleware,
    ],
    resolver(controllerClientProfessionalCreate))
relationRoutes.post('/responsible',
    [
        body("code").isString(),
        body("identifier").isString(),
        validateRequest,
        ResponsibleMiddleware,
    ],
    resolver(controllerClientResponsibleCreate))
relationRoutes.delete('/professional',
    [
        body("identifier").isString(),
        validateRequest,
        ProfessionalMiddleware,
    ],
    resolver(controllerClientProfessionalDelete))
relationRoutes.delete('/responsible',
    [
        body("identifier").isString(),
        validateRequest,
        ResponsibleMiddleware,
    ],
    resolver(controllerClientResponsibleDelete))

export default relationRoutes