
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { resolver } from '../utils/routeAdapters';
import validateRequest from '../utils/validateRequest';

const atecRoutes = Router()

atecRoutes.get('/', resolver(toBeImplemented))//retorna o teste atec com suas devidas questões

atecRoutes.post('/submit',
    [
        body('title').isString(),
        body('notes').isString(),
        body("client").isInt(),
        body('answers').isArray().custom((answers) => answers.length === 77),//.isLength({min: 10, max: 10}),//.withMessage('As respostas devem ser um array com 77 itens'),
        body('answers.*.question').isInt().withMessage('O campo "question" deve ser um número inteiro'),
        body('answers.*.answer').isInt().withMessage('O campo "answer" deve ser um número inteiro'),
        //SpecialistMiddleware,
        validateRequest
    ],
    resolver(toBeImplemented)) //cadastra uma avaliação com suas respostas


atecRoutes.get('/resultoflasttest',
    [
        query('client').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))//retorna o resultado da avaloação pelo id da avaliação

atecRoutes.get('/progressbyarea',
    [
        query('client').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))//retorna o progresso por área nos últimos 7 testes

atecRoutes.get('/listatectestsbyclientid',
    [
        query('skip').isInt(),
        query('take').isInt(),
        query('client').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))

atecRoutes.get('/listevolutionbyarea',
    [
        query('client').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))

atecRoutes.get('/answersbyavaliationid',
    [
        query('id').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))

export default atecRoutes