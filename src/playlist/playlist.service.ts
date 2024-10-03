import { Injectable } from '@nestjs/common';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { PlaylistRepository } from './playlist.repository';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistEntity } from './entities/playlist.entity';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';

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

  async findOne(id: number, playlistId: number) {
    return await this.playlistRepository.findOne(id, playlistId);
  }

  @Admin()
  async update(id: number, playlistId: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistRepository.update(id, playlistId, updatePlaylistDto);
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