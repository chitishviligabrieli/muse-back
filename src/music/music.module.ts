import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MusicRepository } from './music.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MusicEntity } from './entities/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MusicEntity])],
  providers: [MusicService, MusicRepository],
  controllers: [MusicController],
  exports: [MusicRepository],
})
export class MusicModule {}
