import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>) { }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const newUser= this.userRepository.create(data);
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserEntity[]>{
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.email'])
      .getMany()
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.email'])
      .where('user.id = :id', { id })
      .getOne();
  }

  async updateUser(id: number, updateUserDto:UpdateUserDto): Promise<UserEntity> {
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.save(updateUserDto);
  }

  async remove(id: number) {
    await this.userRepository.softDelete(id);

    return await this.userRepository
      .createQueryBuilder('music')
      .withDeleted()
      .where('category.id = :id', { id })
      .getOne();
  }
}

