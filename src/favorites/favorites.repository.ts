import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { FavoritesEntity } from './entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoritesRepository {
  constructor(@InjectRepository(FavoritesEntity)
              private readonly favoritesRepository: Repository<FavoritesEntity>) {
  }

  async create(createFavoritesDto: CreateFavoriteDto) {
    const playlist = this.favoritesRepository.create(createFavoritesDto);
    return await this.favoritesRepository.save(playlist);
  }

  async findAll(): Promise<FavoritesEntity[]> {
    return await this.favoritesRepository.find();
  }

  async findOne(id: number): Promise<FavoritesEntity> {
    return await this.favoritesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.favoritesRepository.softDelete(id);
  }
}