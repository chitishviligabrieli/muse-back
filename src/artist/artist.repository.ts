import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistRepository {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async searchArtists(value: string): Promise<ArtistEntity[]> {
    return this.artistRepository
      .createQueryBuilder('artist')
      .where('artist.firstName LIKE :value', { value: `%${value}%` })
      .orWhere('artist.lastName LIKE :value', { value: `%${value}%` })
      .orWhere('artist.biography LIKE :value', { value: `%${value}%` })
      .getMany();
  }

  async create(data: CreateArtistDto, ImageUrl: string, CoverUrl: string): Promise<ArtistEntity> {
    const newArtist = this.artistRepository.create({
      ...data,
      image: ImageUrl,
      cover: CoverUrl,
    });
    return await this.artistRepository.save(newArtist);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: number): Promise<ArtistEntity> {
    return await this.artistRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateArtistDto): Promise<ArtistEntity> {
    await this.artistRepository.update(id, data,);
    return await this.artistRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.artistRepository.softDelete(id);
  }

}
