import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { resolver } from '../utils/routeAdapters';
import validateRequest from '../utils/validateRequest';
import { ResponsibleMiddleware } from '../utils/middlewares/Responsible';
import { controllerClientCreate, controllerClientDelete, controllerClientDetail, controllerGetByProfessional, controllerGetByResponsible } from '../controller/client';
import { ProfessionalMiddleware } from '../utils/middlewares/Specialist';

const clientRoutes = Router();

clientRoutes.post('/signin',
    [
        body('email').isEmail(),
        body('password').isString(),
        validateRequest],
    resolver(toBeImplemented))

clientRoutes.get('/byspecialist',
    [
        query('skip').isInt(),
        query('take').isInt(),
        //SpecialistMiddleware,
        validateRequest
    ],
    resolver(toBeImplemented))

clientRoutes.get('/byguardian',
    [
        query('skip').isInt(),
        query('take').isInt(),
        //GuardianMiddleware,
        validateRequest
    ],
    resolver(toBeImplemented))
clientRoutes.get('/byprofessional',
    query('skip').isInt(),
    query('take').isInt(),
    ProfessionalMiddleware,
    resolver(controllerGetByProfessional))

clientRoutes.get('/byresponsible',
    query('skip').isInt(),
    query('take').isInt(),
    ResponsibleMiddleware,
    resolver(controllerGetByResponsible))

clientRoutes.get('/:clientid',
    [
        param('clientid').isUUID().withMessage('clientid deve ser um UUID válido'),
        validateRequest
    ],
    //todo: antes de detalhar, verificar se o usuário do token tem vínculo com o client em resposible ou professional
    resolver(controllerClientDetail))
clientRoutes.post(
    '/',
    ResponsibleMiddleware,
    resolver(controllerClientCreate)
);



clientRoutes.delete(
    '/:clientid',
    [
        param('clientid').isUUID().withMessage('clientid deve ser um UUID válido'),
        validateRequest
    ],
    ResponsibleMiddleware,
    resolver(controllerClientDelete)
);



export default clientRoutes
