import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  DeleteDateColumn, UpdateDateColumn, ManyToOne,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { MusicEntity } from '../../music/entities/music.entity';


@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  biography: string;

  @Column({ type: 'varchar' })
  image: string;

  @Column({ type: 'varchar' })
  cover: string;

  @ManyToOne(() => FileEntity)
  file: FileEntity;

  @OneToMany(() => MusicEntity, (music) => music.artist)
  music: MusicEntity[]

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  album: AlbumEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
