import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { FilesService } from '../files/files.service';
import { AlbumEntity } from './entities/album.entity';
import { AlbumResponseDto } from './dto/album-response.dto';

@Injectable()
export class AlbumService {

  constructor(private readonly albumRepository: AlbumRepository,
              private readonly fileService: FilesService) {
  }

  async create(createAlbumDto: CreateAlbumDto, album: {}, AlbumImg: Express.Multer.File): Promise<AlbumEntity> {
    console.log(AlbumImg, "AlbumImg, service")
    const uploadAlbumImg = await this.fileService.uploadFile(AlbumImg)

    console.log(uploadAlbumImg, 'uploadAlbumImg');
    const artistId = createAlbumDto.artistId;
    createAlbumDto.artistId = Number(artistId)

    console.log(createAlbumDto, "createAlbumDto");
    return await this.albumRepository.create(createAlbumDto, uploadAlbumImg.url);
  }

  async findAll(): Promise<AlbumResponseDto[]> {
    const albums = await this.albumRepository.findAll();
    return albums.map((album) => this.toResponseDto(album));
  }

  async findOne(id: number) {
    const album = await this.albumRepository.findAll();
    return album.find(album => album.id === id);
    // console.log(oneAlbum);
    // return await this.albumRepository.findOne(oneAlbum.id);
  }


  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    return await this.albumRepository.update(id, updateAlbumDto);
  }

  @Admin()
  async remove(id: number) {
    return await this.albumRepository.remove(id);
  }


  private toResponseDto(album: AlbumEntity): AlbumResponseDto {
    return {
      id: album.id,
      name: album.title,
      cover: album.albumImg,
      releaseDate: album.releaseDate,
      music: album.music,
      artist: album.artist,
    };
  }
}