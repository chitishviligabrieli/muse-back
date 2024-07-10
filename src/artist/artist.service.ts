import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistRepository.create(createArtistDto);
  }

  findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  findOne(id: number): Promise<Artist> {
    return this.artistRepository.findOne(id);
  }

  update(id: number, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.artistRepository.update(id, updateArtistDto);
  }

  remove(id: number): Promise<void> {
    return this.artistRepository.remove(id);
  }
}
