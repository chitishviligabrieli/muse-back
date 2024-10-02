import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesEnum } from '../auth/role/role';
import { HashingService } from './hashing.service';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UserEntity)
              private readonly userRepository: Repository<UserEntity>,
              private readonly hashingService: HashingService,) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.role = createUserDto.role || RolesEnum.User;
    newUser.blocked = createUserDto.blocked || false;
    const savedUser = await this.userRepository.save(newUser);

    // console.log(savedUser, 'adasdasdadwdadwdadasdq')
    delete savedUser.password;
    return savedUser;
  }


  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.role', 'user.blocked'])
      .getMany();
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.email', 'user.role', 'user.blocked'])
      .where('user.id = :id', { id })
      .getOne();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (updateUserDto.role) {
      user.role = updateUserDto.role;
    }
    console.log(updateUserDto.blocked)
      user.blocked = updateUserDto.blocked;


    if(updateUserDto.password) {
      console.log(updateUserDto.password)
      const hashedPassword = await this.hashingService.hashPassword(updateUserDto.password);
      user.password = hashedPassword;
    }

    return this.userRepository.save(user);
  }

  findByEmailAndPassword(email: string) {
    return this.userRepository.findOne({ where: { email: email }, select: { email: true, password: true, role: true, blocked: true } });
  }

  async remove(id: number) {
    await this.userRepository.softDelete(id);

    return await this.userRepository
      .createQueryBuilder('user')
      .withDeleted()
      .where('user.id = :id', { id })
      .getOne();
  }
}

