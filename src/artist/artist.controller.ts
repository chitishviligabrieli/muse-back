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
    @UploadedFiles() files:  {cover: Express.Multer.File , image: Express.Multer.File},
    @Req() req) {
    const { name, biography } = req.body;

    console.log(files, "artistfile")
    //[
    //   {
    //     fieldname: 'image',
    //     originalname: 'Screenshot 2024-08-22 175225.png',
    //     encoding: '7bit',
    //     mimetype: 'image/png',
    //     buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 ac 00 00 01 4a 08 06 00 00 00 19 b9 d2 f2 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 51764 more bytes>,
    //     size: 51814
    //   }
    //] artistfile

    return await this.artistService.create(createArtistDto, req.user, files.cover[0], files.image[0]);
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


//[
//   {
//     fieldname: 'image',
//     originalname: 'Screenshot 2024-08-22 175225.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 ac 00 00 01 4a 08 06 00 00 00 19 b9 d2 f2 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 51764 more bytes>,
//     size: 51814
//   }
// ] artistfile

// [
//   {
//     fieldname: 'album',
//     originalname: 'Screenshot 2024-08-22 175225.png',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     buffer: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 03 ac 00 00 01 4a 08 06 00 00 00 19 b9 d2 f2 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 00 04 ... 51764 more bytes>,
//     size: 51814
//   }
// ] files.album