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
    console.log(Image, "Image, service")
    // {
    //   fieldname: 'image',
    //   originalname: 'Screenshot 2024-08-22 175225.png',
    //   encoding: '7bit',
    //   mimetype: 'image/png',
    //   buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 ac 00 00 01 4a 08 06 00 00 00 19 b9 d2 f2 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 51764 more bytes>,
    //   size: 51814
    // } Image, service
    const uploadedImageUrl = await this.fileService.uploadFile(Image);
    const uploadedCoverUrl = await this.fileService.uploadFile(Cover);

    return await this.artistRepository.create(createArtistDto, uploadedImageUrl.url, uploadedCoverUrl.url);
  }
  async findAll(): Promise<ArtistEntity[]> {
    return await this.artistRepository.findAll();
  }

  async findOne(id: number){
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
