import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ListenersService } from './listeners.service';
import { CreateListenerDto } from './dto/create-listener.dto';
import { UpdateListenerDto } from './dto/update-listener.dto';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { ListenersEntity } from './entities/listener.entity';

@Controller('listeners')
export class ListenersController {
  constructor(private readonly listenersService: ListenersService) {}

  @Post()
  create(@Body() createListenerDto: CreateListenerDto): Promise<ListenersEntity> {
    return this.listenersService.create(createListenerDto);
  }

  @Get()
  findAll() {
    return this.listenersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ListenersEntity> {
    return this.listenersService.findOne(+id);
  }
}
