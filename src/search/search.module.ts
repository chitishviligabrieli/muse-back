import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { MusicEntity } from 'src/music/entities/music.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ArtistEntity, AlbumEntity, MusicEntity]),
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
