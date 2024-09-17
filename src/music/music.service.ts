import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { FileEntity } from '../files/entities/file.entity';

@Injectable()
export class MusicService {

  constructor(private readonly musicRepository: MusicRepository) { }

  async create(createMusicDto: CreateMusicDto) {
    const  music = await this.musicRepository.create(createMusicDto);
  }

  async findAll() {
    return await this.musicRepository.findAll()
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
