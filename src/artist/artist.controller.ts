import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: {}; 
}
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createArtistDto: CreateArtistDto, @Req() req: CustomRequest) {
    console.log(req.user)
    return await this.artistService.create(createArtistDto,req.user);
  }

  @Get()
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.artistService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return await this.artistService.update(+id, updateArtistDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.artistService.remove(+id);
  }
}
