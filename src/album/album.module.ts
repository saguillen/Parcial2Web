import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AlbumController } from './album.controller';


@Module({
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  controllers: [AlbumController]

})
export class AlbumModule {}
