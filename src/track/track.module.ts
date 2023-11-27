/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackEntity } from './track.entity/track.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumService } from '../album/album.service';
import { AlbumEntity } from '../album/album.entity/album.entity';
import { TrackController } from './track.controller';
@Module({
  imports: [TypeOrmModule.forFeature([TrackEntity,AlbumEntity])],
  providers: [TrackService, AlbumService],
  controllers: [TrackController]
})
export class TrackModule {}