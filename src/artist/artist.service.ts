import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { ArtistEntity } from './entities/artist.entity';
import { Admin } from '../auth/decorators/is-admin.decorator';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  @Admin()
  async create(createArtistDto: CreateArtistDto, user: {}): Promise<ArtistEntity> {
    return await this.artistRepository.create(createArtistDto);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.findAll();
  }

  async findOne(id: number): Promise<ArtistEntity> {
    return await this.artistRepository.findOne(id);
  }

  @Admin()
  async update(id: number, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    return await this.artistRepository.update(id, updateArtistDto);
  }

  @Admin()
  async remove(id: number): Promise<void> {
    return await this.artistRepository.remove(id);
  }
}
