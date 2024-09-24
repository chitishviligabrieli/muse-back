import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from './entities/artist.entity';
import { FilesService } from '../files/files.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, ArtistRepository]), FilesModule],
  providers: [ArtistService, ArtistRepository, FilesService],
  controllers: [ArtistController],
  exports: [ArtistRepository],
})
export class ArtistModule {}
