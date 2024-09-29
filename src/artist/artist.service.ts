import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { ArtistEntity } from './entities/artist.entity';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { AlbumRepository } from '../album/album.repository';
import { FilesService } from '../files/files.service';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository,
              private readonly fileService: FilesService,
  ) {
  }


  async create(createArtistDto: CreateArtistDto, artist: {}, Image: Express.Multer.File, Cover: Express.Multer.File): Promise<ArtistEntity> {
    const uploadedImageUrl = await this.fileService.uploadFile(Image);
    const uploadedCoverUrl = await this.fileService.uploadFile(Cover);

    return await this.artistRepository.create(createArtistDto, uploadedImageUrl.url, uploadedCoverUrl.url);
  }

  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.findAll();
  }

  async findOne(id: number): Promise<ArtistEntity> {
    return await this.artistRepository.findOne(id);
  }

  @Admin()
  async update(id: number, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    return await this.artistRepository.update(id, updateArtistDto);
  }

  @Admin()
  async remove(id: number): Promise<void> {
    return await this.artistRepository.remove(id);
  }
}
