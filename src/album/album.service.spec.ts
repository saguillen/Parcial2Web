/* eslint-disable prettier/prettier */
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
 let albumList: AlbumEntity[];

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [AlbumService],
   }).compile();

   service = module.get<AlbumService>(AlbumService);
   repository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    await seedDatabase();
 });

 const seedDatabase = async () => {
  repository.clear();
  albumList = [];
  for(let i = 0; i < 5; i++){
      const album: AlbumEntity = await repository.save({
      nombre: faker.company.name(), 
      descripcion: faker.lorem.sentence(),
      caratula: faker.image.url(),
      fechaLanzamiento: faker.date.past(),
      duracion: faker.number.int(30),
      tracks: []})
      albumList.push(album);
  }
}
  
 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 it('create should return a new album', async () => {
  const album: AlbumEntity = {
    id: "",
    nombre: faker.company.name(),
    descripcion: faker.lorem.sentence(),
    tracks: [],
    performers: [],
    caratula: '',
    fechaLanzamiento: faker.date.past(),
    duracion: 0
  };

  const newAlbum: AlbumEntity = await service.create(album);
  expect(newAlbum).not.toBeNull();

  const storedAlbum: AlbumEntity = await repository.findOne({where: {id: newAlbum.id}})
  expect(storedAlbum).not.toBeNull();
  expect(storedAlbum.id).toEqual(newAlbum.id)
  expect(storedAlbum.nombre).toEqual(newAlbum.nombre)
  expect(storedAlbum.descripcion).toEqual(newAlbum.descripcion)
});

it('findAll should return a list of albums', async () => {
  const albums: AlbumEntity[] = await service.findAll();
  expect(albums).not.toBeNull();
  expect(albums).toHaveLength(albumList.length)
});

it('findOne should return an album', async () => {
  const storedAlbum: AlbumEntity = albumList[0];
  const album: AlbumEntity = await service.findOne(storedAlbum.id);  expect(album).not.toBeNull();
  expect(album).not.toBeNull();

});

it('findOne should throw an exception for an invalid album', async () => {
  await expect(() => service.findOne("0")).rejects.toHaveProperty("message", `album con ID ${0} no encontrado`)
});


it('remove should return a deleted album', async () => {
  const album: AlbumEntity = albumList[0];
  await service.delete(album.id);

  const deletedAlbum: AlbumEntity  = await repository.findOne({ where: { id: album.id } });
  expect(deletedAlbum).toBeNull();


});

it('delete should throw an exception for an invalid album', async () => {
  const museum: AlbumEntity = albumList[0];
  await service.delete(museum.id);
  await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The album with the given id was not found")
});

});




