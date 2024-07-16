import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { MusicModule } from 'src/music/music.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([]), 
    ArtistModule,
    AlbumModule,
    MusicModule,
  ],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
