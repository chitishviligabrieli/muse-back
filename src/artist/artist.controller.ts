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
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
// import { AuthGuard } from 'src/auth/auth.guard.service';


@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image'},
    { name: 'cover'},
  ]))
  UploadedFile(@UploadedFiles() files: { avatar?: Express.Multer.File[], background?: Express.Multer.File[] }) {
    console.log(files);
  }
  async create(@Body() createArtistDto: CreateArtistDto, @UploadedFile() image : Express.Multer.File, cover : Express.Multer.File,@Req() req) {
    console.log(image)

    return await this.artistService.create(createArtistDto,req.user, image, cover);
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
