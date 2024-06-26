import { handleErrorSync } from '@stlib/utils';
import { RecepieEntity, RecepieType } from '../db';
import { CreateRecepieDto, UpdateRecepieDto } from './dto';
import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class RecepiesService {
  constructor() {
  }

  createRecepie = async (req: Request, res: Response) => {
    try {
      const dto: CreateRecepieDto = req.body;

      const recepie = await RecepieEntity.create({
        id: uuidv4(),
        name: dto.name,
        ingridients: dto.ingridients,
        steps: dto.steps,
        notes: dto.notes
      });

      return res.status(201).json({ recepie });
    } catch (e) {
      handleErrorSync(e);
      return res.json('Error occured, see console logs.').status(500);
    }
  }

  updateRecepie = async (req: Request, res: Response) => {
    try {
      const dto: UpdateRecepieDto = req.body;
      const { id } = req.params;

      const recepie = await RecepieEntity.findOne({
        where: {
          id,
        },
      });

      if(!recepie) {
        return res.status(404).json('Recepie not found.');
      }

      const updateData: UpdateRecepieDto = {
        name: dto.name ? dto.name : recepie.name,
        ingridients: dto.ingridients ? dto.ingridients : recepie.ingridients,
        steps: dto.steps ? dto.steps : recepie.steps,
        notes: dto.notes ? dto.notes : recepie.notes,
      };

      recepie.set(updateData);
      await recepie.save();
      return res.status(200).json('Recepie updated');
    } catch (e) {
      handleErrorSync(e);
      return res.json('Error occured, see console logs.').status(500);
    }
  }

  deleteRecepie = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await RecepieEntity.destroy({
        where: {
          id,
        },
      });

      return res.status(204).json('Deleted');
    } catch (e) {
      handleErrorSync(e);
      return res.json('Error occured, see console logs.').status(500)
    }
  }

  findRecepie = async (req: Request, res: Response) => {
    const { name } = req.params;

    const recepies = await RecepieEntity.findAll({
      where: {
        name,
      },
    });

    if(!recepies.length) {
      return res.status(404).json('Not found any recepy by this name.');
    }

    return res.status(200).json({ recepies });
  }

  findByIngridients = async(req: Request, res: Response) => {
    const { ingridients } = req.params;
    const parsedIngridients = ingridients.split('-');

    const goodRecepies: RecepieType[] = [];

    const recepies = await RecepieEntity.findAll();

    recepies.forEach(recepie => {
      for(let i = 0; i < recepie.ingridients.split('-').length; i++) {
        for(let j = 0; j < parsedIngridients.length; j++) {
          if(recepie.ingridients.split('-')[i] == parsedIngridients[j]) {
            goodRecepies.push(recepie);
          }
        }
      }
    })

    if(!goodRecepies.length) {
      return res.status(404).json('Not found any recepies.');
    }

    return res.status(200).json({ recepies: goodRecepies });
  }
}
