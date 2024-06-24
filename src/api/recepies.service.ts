import { handleErrorSync } from '@stlib/utils';
import { RecepieEntity } from '../db';
import { CreateRecepieDto } from './dto';
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
}
