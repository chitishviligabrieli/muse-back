import { Injectable } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { MusicRepository } from './music.repository';

@Injectable()
export class MusicService {

  constructor(private readonly musicRepository: MusicRepository) { }

  async create(createMusicDto: CreateMusicDto) {
    return this.musicRepository.create(createMusicDto);
  }

  async findAll() {
    return await this.musicRepository.findAll()
  }

  async findOne(id: number) {
    return await this.musicRepository.findOne(id);
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepository.update(id, UpdateMusicDto);
  }

  async remove(id: number) {
    return await this.musicRepository.remove(id);
  }
}
