import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from './entities/playlist.entity';
import { PlaylistRepository } from './playlist.repository';
import { PlaylistService } from './playlist.service';
import { MusicEntity } from '../music/entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity])],
  controllers: [PlaylistController],
  providers: [PlaylistRepository, PlaylistService],
  exports: [PlaylistService, PlaylistRepository],
})
export class PlaylistModule {}



