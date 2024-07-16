import { IsOptional, IsString } from 'class-validator';

export class SearchMusicDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  artistName?: string;
}

export class SearchArtistDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  music?: string;
}
