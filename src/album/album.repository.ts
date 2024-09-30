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

  async searchAlbums(value: string): Promise<AlbumEntity[]> {
    return this.albumRepository
    .createQueryBuilder('album')
      .where('album.title LIKE :value', { value: `%${value}%` })
      .getMany();
  }

  async create(createAlbumDto: CreateAlbumDto, albumImg: string): Promise<AlbumEntity> {
    const newAlbum = this.albumRepository.create({
      ...createAlbumDto,
      albumImg: albumImg
    });

    console.log(newAlbum, "reeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeepository")
    return await this.albumRepository.save(newAlbum);
  }

  async findAll() {
    return await this.albumRepository
      .createQueryBuilder('album')
      .leftJoinAndSelect('album.music','music')
      .getMany();
  }

  async findOne(id: number) {
    return await this.albumRepository
      .createQueryBuilder('album')
      .where('album.id= :id', { id })
      .getOne();
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    await this.albumRepository
      .createQueryBuilder('album')
      .update()
      .set(updateAlbumDto)
      .where('album.id = :id', { id })
      .execute();

    return await this.albumRepository.findOneBy({ id });
  }

  async remove(id: number) {
   await this.albumRepository.softDelete(id);

    return await this.albumRepository
      .createQueryBuilder('album')
      .withDeleted()
      .where('album.id = :id', { id })
      .getOne();
  }
}