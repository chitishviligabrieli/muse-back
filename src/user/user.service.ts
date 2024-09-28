import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HashingService } from './hashing.service';
import { UserRepository } from './user.repository';
import { UserEntity } from './entities/user.entity';
import { Admin } from '../auth/decorators/is-admin.decorator';

@Injectable()
export class UserService {

  constructor(
    private readonly hashingService: HashingService, 
    private readonly userRepository: UserRepository
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.hashingService.hashPassword(createUserDto.password);
    return await this.userRepository.create({ ...createUserDto, password: hashedPassword });
  }

  @Admin()
  async findAll(): Promise<UserEntity[]> {
    const user = await this.userRepository.findAll();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const updatedUser = await this.userRepository.updateUser(id, updateUserDto);
    return updatedUser
  }

  async remove(id: number) {
    return await this.userRepository.remove(id);
  }
}
