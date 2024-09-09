import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UserEntity)
              private readonly userRepository: Repository<UserEntity>) {
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = this.userRepository.create(createUserDto);
    newUser.role = createUserDto.role || 'user';
    const savedUser = await this.userRepository.save(newUser);

    delete savedUser.password;
    return savedUser;
  }
  

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.email', 'user.role'])
      .getMany();
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('user')
      .select(['user.email', 'user.role'])
      .where('user.id = :id', { id })
      .getOne();
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (updateUserDto.role) {
      user.role = updateUserDto.role;
    }

    return this.userRepository.save(user);
  }

  findByEmailAndPassword(email:string){
    return this.userRepository.findOne({where:{email:email},select:{email:true,password:true}})
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

