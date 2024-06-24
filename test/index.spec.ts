import supertest from 'supertest';
import { sequelize } from '../src/db';
import { app } from '../src/server';
import { CreateRecepieDto, UpdateRecepieDto } from '../src/api/dto';

describe('Recepies', () => {
  let id: string = '';
  let name: string = '';

  beforeAll(async () => {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
  })

  afterAll(async () => {
    await sequelize.drop();
  })

  it('Create recepie', async () => {
    const dto: CreateRecepieDto = {
      name: 'my recepie',
      ingridients: '1-cup-milk-1-spoon-smth',
      steps: 'just cook man, bruh',
    }

    const response = await supertest(app).post('/recepies').send(dto).expect(201);

    id = response.body.recepie.id;
    name = response.body.recepie.name;
  })

  it('Update recepie', async () => {
    const dto: UpdateRecepieDto = {
      ingridients: '1-cup-milk-1-spoon-smth-a-lot-of-garlic',
    }

    return supertest(app).patch(`/recepies/${id}`).send(dto).expect(200);
  })

  it('Get by name', async () => {
    return supertest(app).get(`/recepies/${name}`).expect(200);
  })

  it('should throw if not found by name', async () => {
    return supertest(app).get(`/recepies/wrongName`).expect(404);
  })

  it('Get by ingridients', async () => {
    const response = await supertest(app).get(`/recepies/recommend/milk`).expect(200);
    return response;
  })

  it('Get by more than one ingridients', async () => {
    const response = await supertest(app).get(`/recepies/recommend/milk-smth`).expect(200);
    return response;
  })

  it('Should throw if not found recepies by ingridient', async () => {
    const response = await supertest(app).get(`/recepies/recommend/no-such-ingridient`).expect(404);
    return response;
  })

  it('Get by ingridient with wrong ones', async () => {
    const response = await supertest(app).get(`/recepies/recommend/no-such-ingridient-milk`).expect(200);
    return response;
  })

  it('Should delete recepie', async () => {
    const response = await supertest(app).delete(`/recepies/${id}`).expect(204);
    return response;
  })
})
