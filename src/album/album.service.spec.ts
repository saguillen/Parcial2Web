/* eslint-disable prettier/prettier */
/*archivo src/museum/museum.service.spec.ts*/
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { AlbumEntity } from './album.entity/album.entity';
import { AlbumService } from './album.service';
import { faker } from '@faker-js/faker';

describe('AlbumService', () => {
 let service: AlbumService;
 let repository: Repository<AlbumEntity>;

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [AlbumService],
   }).compile();

   service = module.get<AlbumService>(AlbumService);
   repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
 });
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('create should return a new museum', async () => {
  const album: AlbumEntity = {
    id: "",
    nombre: faker.company.companyName(),
    descripcion: faker.lorem.sentence(),
    tracks: [],
    performers: []
  }

  const newAlbum: AlbumEntity = await service.create(album);
  expect(newAlbum).not.toBeNull();

  const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
  expect(storedAlbum).not.toBeNull();
  expect(storedAlbum.id).toEqual(newAlbum.id)
  expect(storedAlbum.nombre).toEqual(newAlbum.nombre)
  expect(storedAlbum.descripcion).toEqual(newAlbum.descripcion)
  expect(storedAlbum.tracks).toEqual(newAlbum.tracks)
});

});
