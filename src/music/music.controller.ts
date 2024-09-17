import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { RolesEnum } from '../auth/role/role';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileEntity } from '../files/entities/file.entity';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}


  // @Roles(Roles.Admin)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createMusicDto: CreateMusicDto) {
    return await this.musicService.create(createMusicDto);
  }
// @UseGuards(RolesEnum.User)
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
