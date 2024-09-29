import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Admin } from '../auth/decorators/is-admin.decorator';



@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {
  }

  @Admin()
  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]))
  async create(
    @Body() createArtistDto: CreateArtistDto,
    @UploadedFiles() files: { image?: Express.Multer.File, cover?: Express.Multer.File },
    @Req() req) {
    const { name, biography } = req.body;

    return await this.artistService.create(createArtistDto, req.user, files.image[0], files.cover[0]);
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
