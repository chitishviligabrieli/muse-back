import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSearchDto } from './dto/create-search.dto';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { MusicEntity } from 'src/music/entities/music.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,

    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,

    @InjectRepository(MusicEntity)
    private musicRepository: Repository<MusicEntity>,
  ) {}

  async search({ value }: CreateSearchDto) {
    const artists = await this.artistRepository
      .createQueryBuilder('artist')
      .where('artist.firstName LIKE :value', { value: `%${value}%` })
      .orWhere('artist.lastName LIKE :value', { value: `%${value}%` })
      .orWhere('artist.biography LIKE :value', { value: `%${value}%` })
      .getMany();

    const albums = await this.albumRepository
      .createQueryBuilder('album')
      .where('album.title LIKE :value', { value: `%${value}%` })
      .getMany();

    const music = await this.musicRepository
      .createQueryBuilder('music')
      .where('music.name LIKE :value', { value: `%${value}%` })
      .getMany();

    return { artists, albums, music };
  }
}
