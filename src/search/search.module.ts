import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Music } from 'src/music/entities/music.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Music, ArtistEntity]),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
