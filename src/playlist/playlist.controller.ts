import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';

@Controller('playlist')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Post(':userId')
  create(@Param(':userId') userId: any ,@Body() createPlaylistDto: CreatePlaylistDto, @Req() req ) {

    const user = Number(req.params.userId);

    console.log(user, "user")

    return this.playlistService.create(createPlaylistDto,user);
  }

  @Get(':userId')
  findAll(@Param('userId')userId: number) {
    return this.playlistService.findAll(userId);
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
