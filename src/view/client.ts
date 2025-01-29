import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { resolver } from '../utils/routeAdapters';
import validateRequest from '../utils/validateRequest';
import { SpecialistMiddleware } from '../utils/middlewares/Specialist';
import { GuardianMiddleware } from '../utils/middlewares/Guardian';
import { controllerClientCreate } from '../controller/client';

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

clientRoutes.get('/:id', resolver(toBeImplemented))
clientRoutes.post(
    '/',
    GuardianMiddleware,
    resolver(controllerClientCreate)
);

clientRoutes.delete('/:id', resolver(toBeImplemented))


export default clientRoutes
