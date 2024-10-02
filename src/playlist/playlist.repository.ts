import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from '../music/entities/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from '../music/dto/create-music.dto';
import { PlaylistEntity } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';

@Injectable()
export class PlaylistRepository {
  constructor(@InjectRepository(PlaylistEntity)
              private readonly playlistRepository: Repository<PlaylistEntity>) { }

  async create(createPlaylistDto: CreatePlaylistDto) {
    const playlist = this.playlistRepository.create(createPlaylistDto);
    return await this.playlistRepository.save(playlist);
  }

  async findAll() {
    return await this.playlistRepository
      .createQueryBuilder('playlist')
      .leftJoinAndSelect('user.playlist', 'user')
      .getMany()
  }

  async findOne(id: number){
    return await this.playlistRepository.findOne({ where: { id } });
  }

  async update(id: number, data: UpdateArtistDto): Promise<PlaylistEntity> {
    await this.playlistRepository.update(id, data,);
    return await this.playlistRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.playlistRepository.softDelete(id);
  }
}