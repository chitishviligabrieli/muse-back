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
  constructor(private readonly playlistService: PlaylistService) {
  }

  @Post(':userId')
  create(@Param(':userId') userId: any, @Body() createPlaylistDto: CreatePlaylistDto, @Req() req) {

    const user = Number(req.params.userId);

    console.log(user, 'user');

    return this.playlistService.create(createPlaylistDto, user);
  }

  @Get(':userId')
  findAll(@Param('userId') userId: number) {
    return this.playlistService.findAll(userId);
  }

  @Get(':playlistId')
  findPlaylist(@Param('playlistId') playlistId: number) {

  }

  @Get(':userId/:playlistId')
  findOne(@Param('userId') id: string, @Param('playlistId') playlistId: number) {
    return this.playlistService.findOne(+id, +playlistId);
  }

  @Patch(':id/:playlistId')
  update(@Param('id') id: string, @Param('playlistId') playlistId: number, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistService.update(+id, +playlistId, updatePlaylistDto);
  }

  @Delete(':id/:playlistId')
  remove(@Param('id') id: string, @Param('playlistId') playlistId: number, @Req() req) {
    const playlist = Number(req.params.playlistId);
    // console.log(playlist, ' playist');
    const userId = Number(req.params.id);
    console.log(userId, 'userId');
    return this.playlistService.remove(+id, +playlist);
  }

  @Patch('/rename/:playlistId')
  rename(@Param('id') id: number, @Body () updatePlaylistDto: UpdatePlaylistDto, @Req() req) {
    console.log(req.params,'params');
    console.log(id)
    const playlist = Number(req.params.id);
    console.log(playlist ,updatePlaylistDto, 'controler')
    return this.playlistService.rename( playlist, updatePlaylistDto );
  }

  @Patch('/add/:id/:playlist/:music')
  async addMusic(@Param('id') id: number, @Param('music') music: number, @Param('playlist') playlist: number, @Req() req) {
    let userId: number;
    userId = Number(req.params.id);
    const musicId = Number(req.params.musicId)
    const playlistId = Number(req.params.playlistId);
console.log(music , 'musicc')
    console.log(playlist , 'playlistt')
    console.log(userId, music, playlist, ' playlist');
    return await this.playlistService.addMusic(playlist ,userId , music);
  }

  @Delete('/add/:id/:playlist/:music')
  async deleteMusic(
    @Param('id') id: number,
    @Param('music') music: number,
    @Param('playlist') playlist: number,
    @Req() req,
  ) {
    const userId = Number(req.params.id)
    const musicId = Number(req.params.music)
    const playlistId = Number(req.params.playlist)
    console.log(userId, musicId, playlistId, ' playlist');
    return this.playlistService.deleteMusic(userId, musicId, playlistId);
  }
}
