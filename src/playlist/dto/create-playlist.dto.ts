import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsNull } from 'typeorm';

export class CreatePlaylistDto {
  @IsString()
  @IsNotEmpty()
  name: string
}
