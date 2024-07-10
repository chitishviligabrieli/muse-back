import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async create(data: CreateArtistDto): Promise<Artist> {
    const newArtist = this.artistRepository.create(data);
    return await this.artistRepository.save(newArtist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: number): Promise<Artist> {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateArtistDto): Promise<Artist> {
    await this.artistRepository.update(id, data);
    return await this.artistRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.artistRepository.delete(id);
  }
}
