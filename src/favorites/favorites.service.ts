import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesEntity } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  async create(createFavoriteDto: CreateFavoriteDto): Promise<FavoritesEntity> {
    return await this.favoritesRepository.create(createFavoriteDto);
  }

  async findAll(): Promise<FavoritesEntity[]> {
    return await this.favoritesRepository.findAll();
  }

  async findOne(id: number): Promise<FavoritesEntity> {
    const favorite = await this.favoritesRepository.findOne(id);
    if (!favorite) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }
    return favorite;
  }

  async update(id: number, updateFavoriteDto: UpdateFavoriteDto): Promise<FavoritesEntity> {
    const favorite = await this.findOne(id);
    const updatedFavorite = { ...favorite, ...updateFavoriteDto };
    return await this.favoritesRepository.create(updatedFavorite);   }


 async remove(id: number): Promise<void> {
  const favorite = await this.findOne(id);  // Check if favorite exists
  if (!favorite) {
    throw new NotFoundException(`Favorite with ID ${id} not found`);
  }
  await this.favoritesRepository.remove(id);
}
}
