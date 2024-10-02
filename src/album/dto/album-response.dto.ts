import { MusicEntity } from 'src/music/entities/music.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

export class AlbumResponseDto {
  id: number;
  name: string;
  releaseDate: string;
  music: MusicEntity[];
  artist: ArtistEntity;
  cover:string;
}
