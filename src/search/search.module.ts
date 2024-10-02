import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { MusicModule } from 'src/music/music.module';
import { SearchEntity } from './entities/search.entity';
import { MusicRepository } from '../music/music.repository';
import { ArtistRepository } from '../artist/artist.repository';
import { AlbumRepository } from '../album/album.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([SearchEntity, ArtistRepository, AlbumRepository, MusicRepository]), // Register repositories/entities here
    ArtistModule,  // Import related modules separately
    AlbumModule,
    MusicModule,
  ],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],  // Export the service if it's needed elsewhere
})
export class SearchModule {}
