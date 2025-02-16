import { Injectable } from '@nestjs/common';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { PlaylistRepository } from './playlist.repository';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PlaylistEntity } from './entities/playlist.entity';
import { MusicRepository } from '../music/music.repository';

@Injectable()
export class PlaylistService {

  constructor(private readonly playlistRepository: PlaylistRepository,
              private readonly musicRepository: MusicRepository,
              ) {
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

  // @Admin()
  async remove(id: number, userId: number ) {
    return await this.playlistRepository.remove(id, userId);
  }

  async addMusic(playlistId: number, userId: number, music: number): Promise<PlaylistEntity> {

    // const asdasd= Number(userId)
    // const playlist = await this.playlistRepository.findOne(userId, playlistId);
    // const newMusic = await this.musicRepository.findOne(musicId)
    // playlist.music.push(newMusic)
    return await this.playlistRepository.addMusic(playlistId, userId, music)

    // return this.playlistRepository.newMusic
    // return this.playlistRepository.a
    // return this.playlistRepository.addMusic(playlist, music);
  }
  async rename(playlistId: number, updatePlaylistDto: UpdatePlaylistDto) {
    return await this.playlistRepository.rename(playlistId, updatePlaylistDto);

  }

  async deleteMusic(userId: number, playlistId: number, musicId: number): Promise<PlaylistEntity> {
  console.log(userId, playlistId, musicId);
    return this.playlistRepository.deleteMusic(userId, playlistId, musicId);

  }
}