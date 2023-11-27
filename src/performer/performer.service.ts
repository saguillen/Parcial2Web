/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { PerformerEntity} from './performer.entity/performer.entity';

@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity) 
        private performerRepository: Repository<PerformerEntity>
    ) { }
    async create(performer: PerformerEntity): Promise<PerformerEntity> {
        if (performer.descripcion.length > 100) {
            throw new BusinessLogicException("Description must not exceed 100 characters", BusinessError.BAD_REQUEST);
        }
        
        return await this.performerRepository.save(performer);
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

}
