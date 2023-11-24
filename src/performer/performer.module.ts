import { Module } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { PerformerEntity } from './performer.entity/performer.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  providers: [PerformerService],
  imports: [TypeOrmModule.forFeature([PerformerEntity])]


})
export class PerformerModule {}
