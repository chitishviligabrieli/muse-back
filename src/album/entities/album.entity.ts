import { CreateMusicDto } from "src/music/dto/create-music.dto";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AlbumEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'timestamp' })
    releaseDate: string;

    @Column({ type: 'simple-array' })
    musics: CreateMusicDto[]

    @Column({ type: 'int' })
    artistId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updaredAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
