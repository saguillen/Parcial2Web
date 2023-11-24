/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PerformerEntity} from './performer.entity/performer.entity';

@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity) 
        private performerRepository: Repository<PerformerEntity>
    ) { }
    async create(track: PerformerEntity): Promise<PerformerEntity> {

            return await this.performerRepository.save(track);

    }
    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find();
    }
    async findOne(id: string): Promise<PerformerEntity> {
        const performer = await this.performerRepository.findOne({where: {id}, relations: ["albums"] });
    
        if (!performer) {
          throw new BusinessLogicException(`performer con ID ${id} no encontrado`,BusinessError.NOT_FOUND);
        }
    
        return performer;
    }

    async delete(id: string) {
        const performer: PerformerEntity = await this.performerRepository.findOne({where:{id}});
        if (!performer)
          throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.performerRepository.remove(performer);
    }
}
