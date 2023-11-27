/* eslint-disable prettier/prettier */
import { Controller, UseInterceptors, Get, Post, Param, Body } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity/performer.entity';
import { PerformerDto } from './performer.dto/performer.dto';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors/business-errors.interceptor';

@Controller('performers')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {

    constructor(private readonly performerService: PerformerService) {}

    @Post()
    async create(@Body() performerDto: PerformerDto) {
        const performer: PerformerEntity = plainToInstance(PerformerEntity, performerDto);
        return await this.performerService.create(performer);
    }

    @Get()
    async findAll() {
        return await this.performerService.findAll();
    }

    @Get(':performerId')
    async findOne(@Param('performerId') performerId: string) {
        return await this.performerService.findOne(performerId);
    }



}