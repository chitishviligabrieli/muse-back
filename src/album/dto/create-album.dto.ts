import { IsArray, IsNotEmpty, isNumber, IsNumber, IsNumberString, IsString, Min } from 'class-validator';
import { CreateMusicDto } from 'src/music/dto/create-music.dto';

export class CreateAlbumDto {

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @IsNumberString()
  artistId: number;
}
