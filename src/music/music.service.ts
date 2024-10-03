import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { FilesService } from '../files/files.service';
import { AlbumEntity } from '../album/entities/album.entity';
import { MusicEntity } from './entities/music.entity';

@Injectable()
export class MusicService {

  constructor(private readonly musicRepository: MusicRepository,
              private readonly fileService: FilesService,) {
  }

  async create(createMusicDto: CreateMusicDto, music: {}, MusicSrc: Express.Multer.File): Promise<MusicEntity> {
    const uploadMusic = await this.fileService.uploadFile(MusicSrc);
    const albumId = createMusicDto.albumId;
    createMusicDto.albumId = Number(albumId)
    return await this.musicRepository.create(createMusicDto, uploadMusic.url)
  }

  async findAll(search?: string){
   return  await this.musicRepository.findAll();
    // return this.musicList
  }

  async findOne(id: number) {
    return await this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepository.update(id, updateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepository.remove(id);
  }
}
