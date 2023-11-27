/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity/performer.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PerformerController } from './performer.controller';

@Module({
  providers: [PerformerService],
  imports: [TypeOrmModule.forFeature([PerformerEntity])],
  controllers: [PerformerController]
})
export class PerformerModule {}
