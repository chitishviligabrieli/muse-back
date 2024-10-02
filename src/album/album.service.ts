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

  async create(createAlbumDto: CreateAlbumDto, album: {}, AlbumImg: Express.Multer.File): Promise<AlbumEntity> {
    console.log(AlbumImg, "AlbumImg, service")
    const uploadAlbumImg = await this.fileService.uploadFile(AlbumImg)

    console.log( uploadAlbumImg, 'uploadAlbumImg');
    const artistId = createAlbumDto.artistId;
    createAlbumDto.artistId = Number(artistId)

    console.log( createAlbumDto, "createAlbumDto");
    return await this.albumRepository.create(createAlbumDto, uploadAlbumImg.url);
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
