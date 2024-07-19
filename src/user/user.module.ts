import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { HashingService } from './hashing.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])],
  controllers: [UserController],
  providers: [UserService, UserRepository, HashingService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
