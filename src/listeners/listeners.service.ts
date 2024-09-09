import { Injectable } from '@nestjs/common';
import { ListenersEntity } from './entities/listener.entity';
import { ListenersRepository } from './listeners.repository';
import { CreateListenerDto } from './dto/create-listener.dto';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { ListenersController } from './listeners.controller';

@Injectable()
export class ListenersService {
  constructor(private readonly listenerRepository: ListenersRepository) {}

  async create(createListenerDto: CreateListenerDto):Promise<ListenersEntity> {
    return await this.listenerRepository.create(createListenerDto)
  }

  async findAll(): Promise<ListenersEntity[]> {
    return await this.listenerRepository.findAll();
  }

  async findOne(id: number): Promise<ListenersEntity> {
    return await this.listenerRepository.findOne(id)
  }
}