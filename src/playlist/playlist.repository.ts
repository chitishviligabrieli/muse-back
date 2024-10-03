import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MusicEntity } from '../music/entities/music.entity';
import { Repository } from 'typeorm';
import { CreateMusicDto } from '../music/dto/create-music.dto';
import { PlaylistEntity } from './entities/playlist.entity';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';
import { MusicRepository } from '../music/music.repository';
import { Playlist } from 'aws-sdk/clients/elastictranscoder';
import { UserEntity } from '../user/entities/user.entity';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Injectable()
export class PlaylistRepository {
  constructor(@InjectRepository(PlaylistEntity)
              private readonly playlistRepository: Repository<PlaylistEntity>,
              private readonly musicrepository: MusicRepository,
              ) { }

  async create(
    createPlaylistDto: CreatePlaylistDto,
    userId: number,
    ): Promise<PlaylistEntity> {
    const newPlaylist = this.playlistRepository.create({
      name: createPlaylistDto.name,
      userId: userId
    });
    return await this.playlistRepository.save(newPlaylist);
  }

  async findAll(userId: number): Promise<PlaylistEntity[]> {
    return await this.playlistRepository.createQueryBuilder('playlist')
      .where('playlist.userId = :userId', {userId})
      .leftJoinAndSelect('playlist.music', 'music')
      .leftJoinAndSelect('music.artist', 'artist')
      .leftJoinAndSelect('playlist.user', 'user')
      .leftJoinAndSelect('music.album', 'album')
      .getMany()
  }

  async findOne(userId: number, playlistId: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.music', 'music')
      .leftJoinAndSelect('music.artist', 'artist')
      .where('playlist.userId = :userId', { userId })
      .getOne();

    return playlist;
  }



  async remove(id: number, userId : number): Promise<void> {
    console.log(id, userId)
    const rame = await this.playlistRepository.createQueryBuilder('playlist')
      .softDelete()
      .where("id = :id", { id })
      .andWhere("userId = :userId", { userId })
      .execute();
    console.log(rame)
  }


  async addMusic(id: number, musicId: number): Promise<PlaylistEntity> {
    const playlist  = await this.playlistRepository.findOne({
      where: { id },
      relations: ['music'],
    });

    const music = await this.musicrepository.findOne(musicId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    if (!music) {
      throw new Error('Music not found');
    }

    const hasMusic = playlist.music.some(m => m.id === musicId);

    if (!hasMusic) {
      playlist.music.push(music);
      return await this.playlistRepository.save(playlist);
    } else {
      throw  new HttpException('Music already exists in the playlist' , HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteMusic(id: number, playlistId: number, musicId: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['music'],
    });

    if (!playlist) {
      throw new Error('Playlist not found');
    }

    const music = playlist.music.find(m => m.id === musicId);

    if (!music) {
      throw new Error('Music not found in the playlist');
    }

    playlist.music = playlist.music.filter(m => m.id !== musicId);

    return await this.playlistRepository.save(playlist);
  }

  async update(
    id: number,
    playlistId: number,
    updatePlaylistDto: UpdatePlaylistDto,
    music: MusicEntity[] = [],
  ): Promise<PlaylistEntity> {
    const existingPlaylist = await this.findOne(id, playlistId);
    if (!existingPlaylist) {
      throw new Error('Playlist not found');
    }

    const updatedPlaylist = {
      ...existingPlaylist,
      playlistName: updatePlaylistDto.name ?? existingPlaylist.name,

      music: music.length > 0 ? music : existingPlaylist.music,
    };

    return await this.playlistRepository.save(updatedPlaylist);
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
}