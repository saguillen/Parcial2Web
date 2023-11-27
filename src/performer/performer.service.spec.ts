/* eslint-disable prettier/prettier */

import { Test, TestingModule } from '@nestjs/testing';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity/performer.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';


describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;
  let performerList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    performerList = [];
    for(let i = 0; i < 5; i++){
        const performer: PerformerEntity = await repository.save({
        nombre: faker.company.name(), 
        descripcion: faker.lorem.sentence(),
        imagen: faker.image.url(),
        albums: []})
        performerList.push(performer);
    }
    return performerList;
  }
  

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new performer', async () => {
    const performer: PerformerEntity = {
      id: "",
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      imagen: faker.image.url(),
      albums: [],
    };

    const newPerformer: PerformerEntity = await service.create(performer);
    expect(newPerformer).not.toBeNull();

    const storedPerformer: PerformerEntity = await repository.findOne({where: {id: newPerformer.id}})
    expect(storedPerformer).not.toBeNull();
  });


  it('findAll should return a list of performers', async () => {
    const storedPerformerList: PerformerEntity[] = await service.findAll();
    expect(storedPerformerList).toHaveLength(performerList.length);
  });

  it('findOne should return a performer', async () => {
    const performerList: PerformerEntity[] = await seedDatabase();
    const storedPerformer: PerformerEntity = performerList[0];
    const performer: PerformerEntity = await service.findOne(storedPerformer.id);  expect(performer).not.toBeNull();
    expect(performer.id).toEqual(storedPerformer.id)
    expect(performer.nombre).toEqual(storedPerformer.nombre)
    expect(performer.descripcion).toEqual(storedPerformer.descripcion)
  });


});