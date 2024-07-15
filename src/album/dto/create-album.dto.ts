import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateMusicDto } from "src/music/dto/create-music.dto";

export class CreateAlbumDto {

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    releaseDate: string

    @IsArray()
    @IsNotEmpty()
    musics: CreateMusicDto[]

    @IsNumber()
    @IsNotEmpty()
    artistId:number
}
