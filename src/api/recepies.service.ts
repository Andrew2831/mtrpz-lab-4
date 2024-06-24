import { handleErrorSync } from '@stlib/utils';
import { RecepieEntity, RecepieType } from '../db';
import { CreateRecepieDto, UpdateRecepieDto } from './dto';
import { Response, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

export class RecepiesService {
  private recepieRespository: typeof RecepieEntity = RecepieEntity;

  constructor() {
  }

  createRecepie = async (res: Response, req: Request) => {
    try {
      const dto: CreateRecepieDto = req.body;

      const recepie = await this.recepieRespository.create({
        id: uuidv4(),
        name: dto.name,
        ingridients: dto.ingridients,
        steps: dto.steps,
        notes: dto.notes
      });

      return res.status(201).json({ recepie });
    } catch (e) {
      handleErrorSync(e);
      return res.json('Error occured, see console logs.')
    }
  }

  updateRecepie = async (res: Response, req: Request) => {
    try {
      const dto: UpdateRecepieDto = req.body;
      const { id } = req.params;

      const recepie = await this.recepieRespository.findOne({
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
      return res.json('Error occured, see console logs.')
    }
  }

  deleteRecepie = async (res: Response, req: Request) => {
    try {
      const { id } = req.params;

      await this.recepieRespository.destroy({
        where: {
          id,
        },
      });

      return res.status(204);
    } catch (e) {
      handleErrorSync(e);
      return res.json('Error occured, see console logs.')
    }
  }

  findRecepie = async (res: Response, req: Request) => {
    const { name } = req.params;

    const recepies = await this.recepieRespository.findAll({
      where: {
        name,
      },
    });

    if(!recepies.length) {
      return res.status(404).json('Not found any recepy by this name.');
    }

    return res.status(200).json({ recepies });
  }
}
