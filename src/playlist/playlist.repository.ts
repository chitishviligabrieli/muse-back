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
      musics: createPlaylistDto.musics || [],
      user: {id: userId}
    });
    return await this.playlistRepository.save(newPlaylist);
  }

  async findAll(): Promise<PlaylistEntity[]> {
    return await this.playlistRepository.createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'music')
      .leftJoinAndSelect('music.artist', 'artist')
      .leftJoinAndSelect('playlist.user', 'user')
      .leftJoinAndSelect('music.album', 'album')
      .getMany()
  }

  async findOne(id: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.createQueryBuilder('playlist')
      .leftJoinAndSelect('playlist.musics', 'music')
      .leftJoinAndSelect('music.artist', 'artist')
      .where('playlist.id = :id', { id })
      .getOne();

    return playlist;
  }



  async remove(id: number): Promise<void> {
    await this.playlistRepository.softDelete(id);
  }

  async addMusic(id: number, musicId: number): Promise<PlaylistEntity> {
    const playlist  = await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });

    const music = await this.musicrepository.findOne(musicId);
    if (!playlist) {
      throw new Error('Playlist not found');
    }

    if (!music) {
      throw new Error('Music not found');
    }

    const hasMusic = playlist.musics.some(m => m.id === musicId);

    if (!hasMusic) {
      playlist.musics.push(music);
      return await this.playlistRepository.save(playlist);
    } else {
      throw  new HttpException('Music already exists in the playlist' , HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteMusic(id: number, musicId: number): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne({
      where: { id },
      relations: ['musics'],
    });

    if (!playlist) {
      throw new Error('Playlist not found');
    }

    const music = playlist.musics.find(m => m.id === musicId);

    if (!music) {
      throw new Error('Music not found in the playlist');
    }

    playlist.musics = playlist.musics.filter(m => m.id !== musicId);

    return await this.playlistRepository.save(playlist);
  }

  async update(
    id: number,
    updatePlaylistDto: UpdatePlaylistDto,
    musics: MusicEntity[] = [],
  ): Promise<PlaylistEntity> {
    const existingPlaylist = await this.findOne(id);
    if (!existingPlaylist) {
      throw new Error('Playlist not found');
    }

    const updatedPlaylist = {
      ...existingPlaylist,
      playlistName: updatePlaylistDto.name ?? existingPlaylist.name,

      musics: musics.length > 0 ? musics : existingPlaylist.musics,
    };

    return await this.playlistRepository.save(updatedPlaylist);
  }

  async delete(id: number): Promise<void> {
    await this.playlistRepository.delete(id);
  }
}