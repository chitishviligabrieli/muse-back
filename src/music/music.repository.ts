import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Music } from "./entities/music.entity";
import { CreateMusicDto } from "./dto/create-music.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateMusicDto } from "./dto/update-music.dto";

@Injectable()
export class MusicRepository {
    constructor(@InjectRepository(Music)
    private readonly musicRepository: Repository<Music>) { }

    async create(data: CreateMusicDto) {
        const newProduct = this.musicRepository.create(data)
        await this.musicRepository.save(newProduct)
    }

    async findAll() {
        await this.musicRepository
            .createQueryBuilder('music')
            .getMany()
    }

    async findOne(id: number) {
        await this.musicRepository
            .createQueryBuilder('music')
            .where('music.id= :id', { id })
            .getOne()
    }

    async update(id: number, data: UpdateMusicDto) {
        await this.musicRepository
            .createQueryBuilder('music')
            .update()
            .set(UpdateMusicDto)
            .where('music.id = :id', { id })
            .execute()

        await this.musicRepository.findOneBy({ id })
    }

    async remove(id: number) {
        await this.musicRepository.softDelete(id)

        await this.musicRepository
            .createQueryBuilder('music')
            .withDeleted()
            .where('category.id = :id', { id })
            .getOne()
    }
}