import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, UnauthorizedException } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post()
  create(@Body() createPlaylistDto: CreatePlaylistDto, @Req() req ) {

    const userId = req.user.id;

    return this.playlistService.create(createPlaylistDto, userId);
  }

  @Get()
  findAll() {
    return this.playlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, updatePlaylistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playlistService.remove(+id);
  }

  @Post(':id/add/:musicId')
  async addMusic(@Param('id') id: number, @Param('musicId') musicId: number) {
    return this.playlistService.addMusic(id, musicId);
  }

  @Delete(':id/add/:musicId')
  async deleteMusic(
    @Param('id') id: number,
    @Param('musicId') musicId: number,
  ) {
    return this.playlistService.deleteMusic(id, musicId);
  }
}
