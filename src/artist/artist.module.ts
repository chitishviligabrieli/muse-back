import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistEntity } from './entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  providers: [ArtistRepository, ArtistService],
  controllers: [ArtistController],
  exports: [ArtistService],
})
export class ArtistModule {}
