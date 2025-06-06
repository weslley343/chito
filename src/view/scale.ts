
import { Router } from 'express';
import { body, param, query } from 'express-validator';
import { toBeImplemented } from '../controller/infra';
import { resolver } from '../utils/routeAdapters';
import validateRequest from '../utils/validateRequest';
import { controllerScalesSubmit, controllerScalesList, controllerScalesDetail, getResultByLastAvaliationOfUser } from '../controller/scales';
import { ProfessionalMiddleware } from '../utils/middlewares/Specialist';

const ScaleRoutes = Router()

ScaleRoutes.get('/', resolver(controllerScalesList))//retorna o teste do id especificado com nome, perguntas e alternativas
ScaleRoutes.get('/:id', resolver(controllerScalesDetail))//retorna o teste do id especificado com nome, perguntas e alternativas

export default ScaleRoutes