import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { Admin } from '../auth/decorators/is-admin.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @UseGuards(RolesGuard)
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Admin()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('block/:id')
  block(@Param('id') id: string) {
    return this.userService.block(+id);
  }

  @Patch('unblock/:id')
  unblock(@Param('id') id: string) {
    return this.userService.unBlock(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
