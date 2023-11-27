/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PerformerAlbumService } from './performer-album.service';
import { faker } from '@faker-js/faker';
import { PerformerEntity } from '../performer/performer.entity/performer.entity';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('PerformerAlbumService', () => {
  let service: PerformerAlbumService;
  let performerRepository: Repository<PerformerEntity>;
  let albumRepository: Repository<AlbumEntity>;
  let album: AlbumEntity;
  let performer: PerformerEntity;
  let performersList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerAlbumService],
    }).compile();
    
    
    service = module.get<PerformerAlbumService>(PerformerAlbumService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    performerRepository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    albumRepository.clear();
    performerRepository.clear();
    performersList = [];

    album = await albumRepository.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      caratula: faker.image.url(),
      fechaLanzamiento: faker.date.past(),
      duracion: faker.number.int(30),
      performers: performersList,
    });
  

    for(let i = 0; i < 5; i++){
        const performer: PerformerEntity = await performerRepository.save({
        nombre: faker.person.firstName(), 
        descripcion: faker.lorem.sentence(),
        imagen: faker.image.url(),
        albums: []})
        performersList.push(performer);
    }

  
  }

  it('should add a performer to an album', async () => {
    const storedPerformer: PerformerEntity = performersList[0];
    const newAlbum = await service.addPerformerToAlbum(album.id, storedPerformer.id);
    expect(newAlbum.performers.length).toBe(1);
  });

  it('should throw an error when adding a performer to an album that does not exist', async () => {
    const storedPerformer: PerformerEntity = performersList[0];
    await expect(service.addPerformerToAlbum(storedPerformer.id, "123")).rejects.toHaveProperty("message", `Album with ID ${123} not found`);
  });

} 
);


