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


@Entity()
export class ArtistEntity {
  @PrimaryGeneratedColumn()
  id: number;
  //
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

  @OneToMany(() => AlbumEntity, (album) => album.artist)
  album: AlbumEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
