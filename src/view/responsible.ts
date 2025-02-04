import { Router } from "express";
import { controllerGetByClient, controllerResponsibleCreate, controllerResponsibleDelete, controllerResponsibleSignin } from "../controller/responsible";
import { body, param, query } from 'express-validator';
import { resolver } from "../utils/routeAdapters";
import validateRequest from "../utils/validateRequest";
import { toBeImplemented } from "../controller/infra";
import { ResponsibleMiddleware } from "../utils/middlewares/Responsible";

const responsibleRoutes = Router()

responsibleRoutes.post('/signin',
    [
        body('email').isEmail(),
        body('password').isString(),
        validateRequest
    ],
    resolver(controllerResponsibleSignin))

responsibleRoutes.post('/',
    [
        body("identifier")
            .isString()
            .withMessage('O campo "identifier" deve ser uma string.')
            .isLength({ max: 30 })
            .withMessage('O campo "identifier" deve ter no máximo 30 caracteres.'),
        body("full_name")
            .isString()
            .withMessage('O campo "full_name" deve ser uma string.')
            .notEmpty()
            .withMessage('O campo "full_name" é obrigatório.'),
        body("password")
            .isString()
            .withMessage('O campo "password" deve ser uma string.')
            .notEmpty()
            .withMessage('O campo "password" é obrigatório.'),
        body("description")
            .optional()
            .isString()
            .withMessage('O campo "description" deve ser uma string.')
            .isLength({ max: 100 })
            .withMessage('O campo "description" deve ter no máximo 100 caracteres.'),
        body("email")
            .isEmail()
            .withMessage('O campo "email" deve ser um e-mail válido.'),
        validateRequest,
    ],
    resolver(controllerResponsibleCreate))
responsibleRoutes.delete('/', 
    ResponsibleMiddleware, 
    resolver(controllerResponsibleDelete))
responsibleRoutes.get('/byclient',
    [
        query('skip').isInt(),
        query('take').isInt(),
        validateRequest
    ],
    resolver(controllerGetByClient))

export default responsibleRoutes