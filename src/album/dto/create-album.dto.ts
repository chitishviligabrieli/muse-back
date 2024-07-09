import { IsArray, IsNumber, IsString } from "class-validator";
import { CreateMusicDto } from "src/music/dto/create-music.dto";

export class CreateAlbumDto {

    @IsString()
    title: string

    @IsString()
    releaseDate: string

    @IsArray()
    musics: CreateMusicDto[]

    @IsNumber()
    artistId:number
}
