import { Module } from '@nestjs/common';
import { ListenersController } from './listeners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListenersEntity } from './entities/listener.entity';
import { ListenersService } from './listeners.service';
import { ListenersRepository } from './listeners.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ListenersEntity])],
  controllers: [ListenersController],
  providers: [ListenersService, ListenersRepository],
  exports: [ListenersService]
})

export class ListenersModule {}
