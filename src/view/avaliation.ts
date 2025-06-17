
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { resolver } from '../utils/routeAdapters';
import validateRequest from '../utils/validateRequest';
import { controllerScalesSubmit, controllerScalesList, controllerScalesDetail, getResultByLastAvaliationOfUser } from '../controller/scales';
import { ProfessionalMiddleware } from '../utils/middlewares/Specialist';
import { DetailAvaliationById, listAvaliationsByClientIdAndScaleId, listEvolutionByDomain } from '../controller/avaliations';

const avaliationRoutes = Router()

avaliationRoutes.get('/historic/:client/:scale',// trocar por /historic e adicionar o filtro do tipo de scale
    [
        // query('skip').isInt(),
        // query('take').isInt(),
        param('client').isUUID(),
        param('scale').isInt(),
        validateRequest
    ],
    // resolver(toBeImplemented)
    resolver(listAvaliationsByClientIdAndScaleId)
)


avaliationRoutes.post('/submit',
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

//------------------------------------ IMPLM

avaliationRoutes.get('/listevolutionbyarea/:client/:scale',// trocar por /progressbyarea
    [
        param('client').isUUID(),
        param('scale').isInt(),
        validateRequest
    ],
    resolver(listEvolutionByDomain))//retorna o progresso por área nos últimos 7 testes

//--------------------------- IMPLM
avaliationRoutes.get('/resultoflasttest/:client',
    [
        param('client').isUUID(),
        validateRequest
    ],
    resolver(getResultByLastAvaliationOfUser))//retorna o resultado da avaloação pelo id da avaliação


avaliationRoutes.get('/:id',
    [
        param('id').isInt(),
        validateRequest
    ],
    resolver(DetailAvaliationById))

export default avaliationRoutes