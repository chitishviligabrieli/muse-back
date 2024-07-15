import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';


@Entity()
export class ArtistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    biography: string;

    @OneToMany(() => AlbumEntity, (album) => album.artist)
    album: AlbumEntity[];

    @CreateDateColumn()
    createdAt:Date;

    @CreateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    deletedAt: Date;
}
