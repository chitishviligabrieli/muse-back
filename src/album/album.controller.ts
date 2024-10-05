import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Admin } from '../auth/decorators/is-admin.decorator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {
  }

  @Admin()
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'album', maxCount: 1 },
  ]))
  async create(
    @Body() createAlbumDto: CreateAlbumDto,
    @UploadedFiles() files: { album: Express.Multer.File},
    @Req() req) {
    const { titile, releaseDate, artistId } = req.body;

    const id = req.body.artistId

    req.body.artistId = Number(id)

    console.log(req.body, "req.body")

    console.log(files, 'files.album');
    // [
      //   {
      //     fieldname: 'album',
      //     originalname: 'Screenshot 2024-08-22 175225.png',
      //     encoding: '7bit',
      //     mimetype: 'image/png',
      //     buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 ac 00 00 01 4a 08 06 00 00 00 19 b9 d2 f2 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 51764 more bytes>,
      //     size: 51814
      //   }
    // ] files.album
    console.log(files.album[0].originalname, 'files.album[0].originalname');
    // Screenshot 2024-08-22 175225.png files.album[0].originalname

    return await this.albumService.create(createAlbumDto, req.user, files.album[0]);

  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(id)
    return await this.albumService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return await this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.albumService.remove(+id);
  }
}
