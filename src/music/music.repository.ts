import { Repository } from "typeorm";
import { MusicEntity } from "./entities/music.entity";
import { CreateMusicDto } from "./dto/create-music.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateMusicDto } from "./dto/update-music.dto";
import { Injectable } from '@nestjs/common';

@Injectable()
export class MusicRepository {
  constructor(@InjectRepository(MusicEntity)
              private readonly musicRepository: Repository<MusicEntity>) { }

  async create(data: CreateMusicDto) {
    const newProduct = this.musicRepository.create(data);
      return await this.musicRepository.save(newProduct);
  }

  async findAll() {
    return await this.musicRepository
      .createQueryBuilder('music')
      .getMany();
  }

  async findOne(id: number) {
    return await this.musicRepository
      .createQueryBuilder('music')
      .where('music.id= :id', { id })
      .getOne();
  }

  async update(id: number, updateMusicDto: UpdateMusicDto) {
    return await this.musicRepository
      .createQueryBuilder('music')
      .update()
      .set(updateMusicDto)
      .where('music.id = :id', { id })
      .execute();

    return await this.musicRepository.findOneBy({ id });
  }

  async remove(id: number) {
    return await this.musicRepository.softDelete(id);

    return await this.musicRepository
      .createQueryBuilder('music')
      .withDeleted()
      .where('category.id = :id', { id })
      .getOne();
  }
}