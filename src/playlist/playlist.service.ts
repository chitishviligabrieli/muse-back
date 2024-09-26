import { Injectable } from '@nestjs/common';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { CreateAlbumDto } from '../album/dto/create-album.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { PlaylistRepository } from './playlist.repository';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistService {

  constructor(private readonly playlistRepository: PlaylistRepository) {
  }

  @Admin()
  async create(createPlaylistDto: CreatePlaylistDto) {
    return await this.playlistRepository.create(createPlaylistDto);
  }

  async findAll() {
    return await this.playlistRepository.findAll();
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
}