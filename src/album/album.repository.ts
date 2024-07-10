import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Album } from "./entities/album.entity";
import { Repository } from "typeorm";
import { UpdateAlbumDto } from "./dto/update-album.dto";
import { CreateAlbumDto } from "./dto/create-album.dto";

@Injectable()
export class AlbumRepository {
    constructor(@InjectRepository(Album)
    private readonly albumRepository: Repository<Album>) { }

    async create(createAlbumDto: CreateAlbumDto) {
        const newProduct = this.albumRepository.create(createAlbumDto)
        await this.albumRepository.save(newProduct)
    }

    async findAll() {
        await this.albumRepository
            .createQueryBuilder('album')
            .getMany()
    }

    async findOne(id: number) {
        await this.albumRepository
            .createQueryBuilder('album')
            .where('album.id= :id', { id })
            .getOne()
    }

    async update(id: number, data: UpdateAlbumDto) {
        await this.albumRepository
            .createQueryBuilder('album')
            .update()
            .set(data)
            .where('album.id = :id', { id })
            .execute()

        await this.albumRepository.findOneBy({ id })
    }

    async remove(id: number) {
        await this.albumRepository.softDelete(id)

        await this.albumRepository
            .createQueryBuilder('album')
            .withDeleted()
            .where('category.id = :id', { id })
            .getOne()
    }
}