import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { TrackEntity } from './track.entity/track.entity';

@Module({
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([TrackEntity])],
})
export class TrackModule {}
