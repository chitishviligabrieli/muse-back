import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMusicDto {
    @IsString()
    @IsNotEmpty()
    musicTitle: string

    @IsString()
    file?:any

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
