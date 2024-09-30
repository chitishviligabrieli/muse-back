import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { MusicEntity } from '../../music/entities/music.entity';
import { FileEntity } from '../../files/entities/file.entity';

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'varchar' })
    releaseDate: string;

    @Column({type: 'varchar'})
    albumImg: string;

    @OneToMany(() => MusicEntity, (music) => music.album)
    music:MusicEntity[];

    @ManyToOne(() => FileEntity)
    file: FileEntity;

    @ManyToOne(() => ArtistEntity, (artist) => artist.album)
    artist:ArtistEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
