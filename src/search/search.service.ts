import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchRepository } from './search.repository';
import { SearchMusicDto, SearchArtistDto } from './dto/create-search.dto';
import { Music } from 'src/music/entities/music.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';


@Injectable()
export class SearchService {
  private searchRepository: SearchRepository;

  constructor(
    @InjectRepository(Music)
    private readonly musicRepository: Repository<Music>,
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {
    this.searchRepository = new SearchRepository(this.musicRepository, this.artistRepository);
  }

  async search(searchParams: { music?: SearchMusicDto; artist?: SearchArtistDto }): Promise<{ musicResults: Music[], artistResults: ArtistEntity[] }> {
    const musicResults = await this.searchRepository.searchMusic(searchParams.music || {});
    const artistResults = await this.searchRepository.searchArtists(searchParams.artist || {});
    return { musicResults, artistResults };
  }
}
