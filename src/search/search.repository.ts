import { Repository } from 'typeorm';
import { SearchMusicDto, SearchArtistDto } from './dto/create-search.dto';
import { Music } from 'src/music/entities/music.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

export class SearchRepository {
  constructor(
    private readonly musicRepository: Repository<Music>,
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async searchMusic(searchParams: SearchMusicDto): Promise<Music[]> {
    const query = this.musicRepository.createQueryBuilder('music')
      .leftJoinAndSelect('music.artist', 'artist');

    if (searchParams.name) {
      query.andWhere('music.name LIKE :name', { name: `%${searchParams.name}%` });
    }

    if (searchParams.artistName) {
      query.andWhere('artist.firstName LIKE :artistName OR artist.lastName LIKE :artistName', { artistName: `%${searchParams.artistName}%` });
    }

    return query.getMany();
  }

  async searchArtists(searchParams: SearchArtistDto): Promise<ArtistEntity[]> {
    const query = this.artistRepository.createQueryBuilder('artist');

    if (searchParams.firstName) {
      query.andWhere('artist.firstName LIKE :firstName', { firstName: `%${searchParams.firstName}%` });
    }

    if (searchParams.lastName) {
      query.andWhere('artist.lastName LIKE :lastName', { lastName: `%${searchParams.lastName}%` });
    }

    if (searchParams.music) {
      query.andWhere('artist.musics LIKE :music', { music: `%${searchParams.music}%` });
    }

    return query.getMany();
  }
}
