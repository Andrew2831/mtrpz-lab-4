import express from 'express';
import { RecepiesService } from './recepies.service';

export const recepiesController = express.Router();

const recepieService = new RecepiesService();

recepiesController.post('/recepies', recepieService.createRecepie);
recepiesController.patch('/recepies/:id', recepieService.updateRecepie);
recepiesController.delete('/recepies/:id', recepieService.deleteRecepie);
recepiesController.get('/recepies/:name', recepieService.findRecepie);
recepiesController.get('/recepies/recommend/:ingridients');
