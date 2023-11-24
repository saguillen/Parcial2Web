import { Injectable } from '@nestjs/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { PerformerService } from '../performer/performer.service';


@Injectable()
export class PerformerAlbumService {
    constructor(
        private readonly albumService: AlbumService,
        private readonly performerService: PerformerService,
    ) {}

    PerformerToAlbum(albumId: string, performerId: string): void {
        const album = this.albumService.findOne(albumId);
        const performer = this.performerService.findOne(performerId);

        if (!album || !performer) {
            throw new NotFoundException('Album or performer not found');
        }

        if (album.performers.length >= 3) {
            throw new Error('Album already has maximum number of performers');
        }

        album.performers.push(performer);
    }
}
}
