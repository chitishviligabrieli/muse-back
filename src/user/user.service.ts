import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingService } from './hashing.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(private readonly hashingService: HashingService, private readonly userRepository: UserRepository) {
  }

  async createUser(password: string): Promise<void> {
    const hashedPassword = await this.hashingService.hashPassword(password);
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return this.hashingService.comparePassword(password, hashedPassword);
  }


  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.userRepository.create(createUserDto)
  }

  async findAll(): Promise<UserEntity[]> {
    const user = await this.userRepository.findAll();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOne(id: number):Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.updateUser(id, updateUserDto);
    return this.userRepository.findOne(id);

  }

  async remove(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(id);
  }
}
