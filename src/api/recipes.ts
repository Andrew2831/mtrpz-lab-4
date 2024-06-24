import express from 'express';

export const recepiesController = express.Router();

recepiesController.post('/recepies');
recepiesController.patch('/recepies/:id');
recepiesController.delete('/recepies/:id');
recepiesController.get('/recepies/:name');
recepiesController.get('/recepies/recommend/:ingridients');
