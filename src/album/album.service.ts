import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { FilesService } from '../files/files.service';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumService {

  constructor(private readonly albumRepository: AlbumRepository,
              private readonly fileService: FilesService) {
  }

  async create(createMusicDto: CreateAlbumDto, album: {}, albumImg: Express.Multer.File): Promise<AlbumEntity> {
    const uploadAlbumImg = await this.fileService.uploadFile(albumImg);
    console.log('service')
    return await this.albumRepository.create(createMusicDto, uploadAlbumImg.url);
  }

  async findAll() {
    return await this.albumRepository.findAll();
  }

  async findOne(id: number) {
    return await this.albumRepository.findOne(id);
  }


  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  @Admin()
  async remove(id: number) {
    return await this.albumRepository.remove(id);
  }
}
