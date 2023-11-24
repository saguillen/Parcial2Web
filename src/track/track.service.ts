/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TrackEntity } from './track.entity/track.entity';
import { AlbumEntity } from 'src/album/album.entity/album.entity';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity) 
        private trackRepository: Repository<TrackEntity>,
        private albumRepository: Repository<AlbumEntity>
    ) { }
    async create(id: string, track: TrackEntity): Promise<TrackEntity> {
        const album = await this.albumRepository.findOne({ where: { id }, relations: ["tracks", "performers"] });
        if (!album) {
            throw new BusinessLogicException(`Album with ID ${id} not found`, BusinessError.NOT_FOUND);
        }

        if (track.duracion <= 0 || isNaN(track.duracion)) {
            throw new BusinessLogicException("duracion must be a positive number", BusinessError.BAD_REQUEST);
        }

        track.album = album;
        return await this.trackRepository.save(track);
    }
    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find();

    }

    async findOne(id: string): Promise<TrackEntity> {
        const track = await this.trackRepository.findOne({ where: { id }, relations: ["album"] });

        if (!track) {
            throw new BusinessLogicException(`track con ID ${id} no encontrado`, BusinessError.NOT_FOUND);
        }

        return track;
    }
}
