/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { AlbumEntity } from './album.entity/album.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity) 
        private albumRepository: Repository<AlbumEntity>
    ) { }
    async create(album: AlbumEntity): Promise<AlbumEntity> {
        if (!album.nombre || !album.descripcion) {
            throw new BusinessLogicException("Nombre and descripcion are required", BusinessError.NOT_FOUND);
        }
        
        return await this.albumRepository.save(album);
    }
    async findAll(): Promise<AlbumEntity[]> {
            return await this.albumRepository.find();

    }
    async findOne(id: string): Promise<AlbumEntity> {
        const album = await this.albumRepository.findOne({where: {id}, relations: ["tracks","performers"] });
    
        if (!album) {
          throw new BusinessLogicException(`album con ID ${id} no encontrado`,BusinessError.NOT_FOUND);
        }
    
        return album;
    }

    async delete(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.albumRepository.remove(album);
    }
}
