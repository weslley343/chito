
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { resolver } from '../utils/routeAdapters';
import validateRequest from '../utils/validateRequest';
import { controllerScalesDetail, controllerScalesList } from '../controller/scales';

const scalesRoutes = Router()

scalesRoutes.get('/', resolver(controllerScalesList))//retorna o teste do id especificado com nome, perguntas e alternativas

scalesRoutes.get('/:id', resolver(controllerScalesDetail))//retorna o teste do id especificado com nome, perguntas e alternativas

scalesRoutes.post('/submit',
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


scalesRoutes.get('/resultoflasttest',
    [
        query('client').isInt(),
        validateRequest
    ],
    resolver(toBeImplemented))//retorna o resultado da avaloação pelo id da avaliação

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