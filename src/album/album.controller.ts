import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) { }

  @UseInterceptors(FileFieldsInterceptor([
    { name: 'album', maxCount: 1 }
  ]))
  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto, @UploadedFiles() file: {albumImg?: Express.Multer.File}, @Req() req) {

    console.log("posted.controler")

    return await this.albumService.create(createAlbumDto, req.user, file.albumImg[0]);

  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
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
