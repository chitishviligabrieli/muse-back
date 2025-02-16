import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req, UploadedFiles,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Admin } from '../auth/decorators/is-admin.decorator';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {
  }


  @Admin()
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'music', maxCount: 1 }]))
  async create(
    @Body() createMusicDto: CreateMusicDto,
    @UploadedFiles() files: {
      music: Express.Multer.File
    },
    musicImg: Express.Multer.File,
    @Req() req) {

    const { name, duration, albumId, artistId } = req.body;

    const id = req.body.albumId;
    const artist = req.body.artistId;


    function randomFileName(length: number): string {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < characters.length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    }

    let rendomfile = randomFileName(files.music[0].originalname);

    files.music[0].originalname = rendomfile;

    req.body.albumId = Number(id);
    req.body.artistId = Number(artist);

    console.log(files.music[0]);

    if (!files) {
      throw new Error('No file uploaded. Check if the field in Postman is "music".');
    }
    console.log(createMusicDto, 'createmUisccccccccccccccccccc');
    return await this.musicService.create(createMusicDto, req.user, files.music[0]);
  }

  @Get()
  async findAll() {
    console.log(this.musicService.findAll());
    return await this.musicService.findAll();


  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.musicService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return await this.musicService.update(+id, updateMusicDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.musicService.remove(+id);
  }
}
