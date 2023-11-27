/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { TrackEntity } from './track.entity/track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { AlbumService } from '../album/album.service';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity) 
        private readonly trackRepository: Repository<TrackEntity>,
        private readonly albumService: AlbumService
    ) { }
    async create(id: string, track: TrackEntity): Promise<TrackEntity> {
        const album: AlbumEntity = await this.albumService.findOne(id);
        if (!album) {
            throw new BusinessLogicException(`Album with ID ${id} not found`, BusinessError.NOT_FOUND);
        }

        if (track.duracion <= 0) {
            throw new BusinessLogicException("duracion must be a positive number", BusinessError.BAD_REQUEST);
        }

        return await this.trackRepository.save(track);
    }
    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find();

    }

    async findOne(id: string): Promise<TrackEntity> {
        const track = await this.trackRepository.findOne({ where: { id }});

        if (!track) {
            throw new BusinessLogicException(`track con ID ${id} no encontrado`, BusinessError.NOT_FOUND);
        }

        return track;
    }
}


