import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { IsNull } from 'typeorm';
import { CreateMusicDto } from '../../music/dto/create-music.dto';
import { Type } from 'class-transformer';

export class CreatePlaylistDto {
  @IsString()
  name!: string

  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => CreateMusicDto)
  // music: CreateMusicDto[];
}
