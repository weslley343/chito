
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { resolver } from '../utils/routeAdapters';
import validateRequest from '../utils/validateRequest';
import { controllerScalesSubmit, controllerScalesList, controllerScalesDetail, getResultByLastAvaliationOfUser } from '../controller/scales';
import { ProfessionalMiddleware } from '../utils/middlewares/Specialist';

const scalesRoutes = Router()

scalesRoutes.get('/', resolver(controllerScalesList))//retorna o teste do id especificado com nome, perguntas e alternativas



scalesRoutes.post('/submit',
    [
        body('scale').isInt(),
        body('title').isString(),
        body('notes').isString(),
        body("client").isUUID(),
        body('answers').isArray().custom((answers) => answers.length > 0),//.isLength({min: 10, max: 10}),//.withMessage('As respostas devem ser um array com 77 itens'),
        body('answers.*.question').isInt().withMessage('O campo "question" deve ser um número inteiro'),
        body('answers.*.item').isInt().withMessage('O campo "answer" deve ser um número inteiro'),
        ProfessionalMiddleware,
        validateRequest
    ],
    resolver(controllerScalesSubmit)) //cadastra uma avaliação com suas respostas


scalesRoutes.get('/:id', resolver(controllerScalesDetail))//retorna o teste do id especificado com nome, perguntas e alternativas
scalesRoutes.get('/resultoflasttest/:client',
    [
        param('client').isUUID(),
        validateRequest
    ],
    resolver(getResultByLastAvaliationOfUser))//retorna o resultado da avaloação pelo id da avaliação

scalesRoutes.get('/progressbyarea',
    [
        query('client').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))//retorna o progresso por área nos últimos 7 testes

scalesRoutes.get('/listatectestsbyclientid',
    [
        query('skip').isInt(),
        query('take').isInt(),
        query('client').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))

scalesRoutes.get('/listevolutionbyarea',
    [
        query('client').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))

scalesRoutes.get('/answersbyavaliationid',
    [
        query('id').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))

export default scalesRoutes