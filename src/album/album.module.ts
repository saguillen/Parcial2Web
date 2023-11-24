import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumEntity } from './album.entity/album.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';


@Module({
  providers: [AlbumService],
  imports: [TypeOrmModule.forFeature([AlbumEntity])]

})
export class AlbumModule {}
