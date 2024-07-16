import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchMusicDto, SearchArtistDto } from './dto/create-search.dto';
import { Music } from 'src/music/entities/music.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';


@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(
    @Query() musicParams: SearchMusicDto,
    @Query() artistParams: SearchArtistDto,
  ): Promise<{ musicResults: Music[], artistResults: ArtistEntity[] }> {
    return this.searchService.search({ music: musicParams, artist: artistParams });
  }
}
