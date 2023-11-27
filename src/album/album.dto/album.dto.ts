/* eslint-disable prettier/prettier */
import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class AlbumDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly caratula: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsDateString()
    @IsNotEmpty()
    readonly fechaLanzamiento: Date;

}