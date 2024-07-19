import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
    DeleteDateColumn, UpdateDateColumn,
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
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
