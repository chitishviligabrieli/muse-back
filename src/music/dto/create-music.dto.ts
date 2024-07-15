import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMusicDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    artistId: number;

    @IsNumber()
    @IsNotEmpty()
    duration: number;

}
