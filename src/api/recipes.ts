import express from 'express';
import { RecepiesService } from './recepies.service';

export const recepiesController = express.Router();

const recepieService = new RecepiesService();

recepiesController.post('/recepies', recepieService.createRecepie);
recepiesController.patch('/recepies/:id');
recepiesController.delete('/recepies/:id');
recepiesController.get('/recepies/:name');
recepiesController.get('/recepies/recommend/:ingridients');
