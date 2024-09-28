import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesRepository } from './favorites.repository';
import { FavoritesEntity } from './entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavoritesEntity])],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
  exports: [FavoritesRepository],
})
export class FavoritesModule {}
