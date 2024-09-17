import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { Admin } from '../auth/decorators/is-admin.decorator';

@Injectable()
export class AlbumService {

  constructor(private readonly albumRepository: AlbumRepository) {
  }

  @Admin()
  async create(createMusicDto: CreateAlbumDto) {
    return await this.albumRepository.create(createMusicDto);
  }

  async findAll() {
    return await this.albumRepository.findAll();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOne(id);
  }

  @Admin()
  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  @Admin()
  async remove(id: number) {
    return await this.albumRepository.remove(id);
  }
}
