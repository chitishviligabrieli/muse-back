import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListenersEntity } from './entities/listener.entity';
import { Repository } from 'typeorm';
import { CreateListenerDto } from './dto/create-listener.dto';

@Injectable()

export class ListenersRepository {
  constructor(
    @InjectRepository(ListenersEntity)
    private readonly listenersRepository: Repository<ListenersEntity>) {}

  async create(createListenerDto: CreateListenerDto): Promise<ListenersEntity> {
    const listener = this.listenersRepository.create(createListenerDto);
    return await this.listenersRepository.save(listener);
  }

  async findAll(): Promise<ListenersEntity[]> {
    return await this.listenersRepository.find();
  }

  async findOne(id: number): Promise<ListenersEntity> {
    return await this.listenersRepository.findOne({ where: { id } });
  }


}