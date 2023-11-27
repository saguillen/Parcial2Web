/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PerformerEntity } from '../performer/performer.entity/performer.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';


@Injectable()
export class PerformerAlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private  albumRepository: Repository<AlbumEntity>,
        @InjectRepository(PerformerEntity)
        private performerRepository: Repository<PerformerEntity>
    ) {}

    async addPerformerToAlbum(idAlbum: string, idPerformer: string): Promise<AlbumEntity> {

            const album: AlbumEntity = await this.albumRepository.findOne({where: {id: idAlbum}, relations: ["performers"] });
            const performer: PerformerEntity = await this.performerRepository.findOne({where: {id: idPerformer} });

            if (!album) {
                throw new BusinessLogicException(`The album with the given id was not found`, BusinessError.NOT_FOUND);
            }

            if (!performer) {
                throw new BusinessLogicException(`Performer with ID ${idPerformer} not found`, BusinessError.NOT_FOUND);
            }


            if (album.performers.length == 3) {
                throw new BusinessLogicException("Album can not have more than 3 performers", BusinessError.BAD_REQUEST);
            }

            album.performers.push(performer);

            return await this.albumRepository.save(album);
        }
    
}

