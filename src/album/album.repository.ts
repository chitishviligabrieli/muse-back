import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumRepository {
  constructor(@InjectRepository(AlbumEntity)
              private readonly albumRepository: Repository<AlbumEntity>) {
  }

  async create(createAlbumDto: CreateAlbumDto) {
    const newProduct = this.albumRepository.create(createAlbumDto);
    return await this.albumRepository.save(newProduct);
  }

  async findAll() {
    return await this.albumRepository
      .createQueryBuilder('album')
      .getMany();
  }

  async findOne(id: number) {
    return await this.albumRepository
      .createQueryBuilder('album')
      .where('album.id= :id', { id })
      .getOne();
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository
      .createQueryBuilder('album')
      .update()
      .set(updateAlbumDto)
      .where('album.id = :id', { id })
      .execute();

    return await this.albumRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.albumRepository.softDelete(id);

    return await this.albumRepository
      .createQueryBuilder('album')
      .withDeleted()
      .where('category.id = :id', { id })
      .getOne();
  }
}