import { Injectable } from '@nestjs/common';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { PlaylistRepository } from './playlist.repository';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistEntity } from './entities/playlist.entity';

@Injectable()
export class PlaylistService {

  constructor(private readonly playlistRepository: PlaylistRepository) {
  }

  @Admin()
  async create(createPlaylistDto: CreatePlaylistDto, userId: number): Promise<PlaylistEntity> {
    return await this.playlistRepository.create(createPlaylistDto, userId);
  }

  async findAll(userId: number): Promise<PlaylistEntity[]> {
    return await this.playlistRepository.findAll(userId);
  }

  async findOne(id: number) {
    return await this.playlistRepository.findOne(id);
  }

  @Admin()
  async update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistRepository.update(id, updatePlaylistDto);
  }

  @Admin()
  async remove(id: number) {
    return await this.playlistRepository.remove(id);
  }

  async addMusic(playlistId: number, musicId: number): Promise<PlaylistEntity> {
    return this.playlistRepository.addMusic(playlistId, musicId);
  }

  async deleteMusic(playlistId: number, musicId: number): Promise<PlaylistEntity> {
    return this.playlistRepository.deleteMusic(playlistId, musicId);
  }
}