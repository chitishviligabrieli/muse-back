import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { FilesRepository } from '../files/files.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, AlbumRepository])],
  providers: [AlbumService, AlbumRepository],
  controllers: [AlbumController],
  exports: [AlbumRepository],
})
export class AlbumModule {}
