/* eslint-disable prettier/prettier */


import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { TrackService } from './track.service';
import { AlbumService } from '../album/album.service';
import { TrackEntity } from './track.entity/track.entity';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';




describe('TrackService', () => {
  let service: TrackService;
  let repository: Repository<TrackEntity>;
  let trackList: TrackEntity[];
  let album: AlbumEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TrackService, AlbumService],
    }).compile();

    service = module.get<TrackService>(TrackService);
    repository = module.get<Repository<TrackEntity>>(getRepositoryToken(TrackEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    trackList = [];

    album = await repository.manager.save(AlbumEntity,{
      nombre: faker.company.name(), 
      descripcion: faker.lorem.sentence(),
      caratula: faker.image.url(),
      fechaLanzamiento: faker.date.past(),
      duracion: faker.number.int(30),
      tracks: trackList});

    for(let i = 0; i < 5; i++){
        const track: TrackEntity = await repository.save({
        nombre: faker.lorem.word(), 
        duracion: faker.number.int(200),
        album: album
        })
        trackList.push(track);
    }



  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new track', async () => {
    const track: TrackEntity = {
      id: "",
      nombre: faker.lorem.word(),
      duracion: faker.number.int(200),
      album: null
    };

    const newTrack: TrackEntity = await service.create(album.id, track);
    expect(newTrack).not.toBeNull();


    const storedTrack: TrackEntity = await repository.findOne({where: {id: newTrack.id}})
    expect(storedTrack).not.toBeNull();
  });


  it('create should throw an exception if album does not exist', async () => {
    const track: TrackEntity = {
      id: "",
      nombre: faker.lorem.word(),
      duracion: faker.number.int(200),
      album: null
    };

    await expect(service.create("123",track)).rejects.toHaveProperty("message", `album con ID ${123} no encontrado`);
  });


  it('findOne should return a track', async () => {
    const storedTrack: TrackEntity = trackList[0];
    const track: TrackEntity = await service.findOne(storedTrack.id);  
    expect(track).not.toBeNull();
  
  });

  it('findOne should throw an exception for an invalid track', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", `track con ID ${0} no encontrado`)
  });

  it('findAll should return a list of tracks', async () => {
    const tracks: TrackEntity[] = await service.findAll();
    expect(tracks).not.toBeNull();
    expect(tracks).toHaveLength(trackList.length)
  });
  
  

  

});
