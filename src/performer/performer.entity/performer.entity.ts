/* eslint-disable prettier/prettier */

import { AlbumEntity } from 'src/album/album.entity/album.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PerformerEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;

    @Column()

    imagen: string;

    @Column()
    descripcion: string;


    @ManyToMany(() => AlbumEntity, album => album.performers)
    @JoinTable()
    albums: AlbumEntity[];
}
