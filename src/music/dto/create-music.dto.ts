import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMusicDto {
    @IsString()
    @IsNotEmpty()
    musicTitle: string

    @IsString()
    file:string

    @IsString()
    artistName: string

    @IsString()
    src: string

    @IsNumber()
    @IsNotEmpty()
    artistId: number;

    @IsNumber()
    @IsNotEmpty()
    duration: number;
}
