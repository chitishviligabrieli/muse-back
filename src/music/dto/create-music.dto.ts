import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateMusicDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    albumId: number;
}
