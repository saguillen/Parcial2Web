/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';

export class PerformerDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
    
    @IsString()
    @IsNotEmpty()
    readonly imagen: string;



}