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
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}



  @Admin()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createMusicDto: CreateMusicDto, @UploadedFile() file: Express.Multer.File) {
    return await this.musicService.create({...createMusicDto, file});
  }

  @Get()
  async findAll() {
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
