import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSearchDto } from './dto/create-search.dto';
import { ArtistRepository } from 'src/artist/artist.repository';
import { AlbumRepository } from 'src/album/album.repository';
import { MusicRepository } from 'src/music/music.repository';


@Injectable()
export class SearchService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly musicRepository: MusicRepository,
  ) {}

  async search({ value }: CreateSearchDto) {
    const artists = await this.artistRepository.searchArtists(value);
    const albums = await this.albumRepository.searchAlbums(value);
    const music = await this.musicRepository.searchMusic(value);

    return { artists, albums, music };
  }
}