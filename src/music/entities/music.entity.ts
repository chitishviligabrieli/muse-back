import {
  Column,
  CreateDateColumn, DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';


@Entity()
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  artistId: number;

  @Column({ type: 'int' })
  duration: number;

  @ManyToOne(() => AlbumEntity, (album) => album.music)
  @JoinColumn({ name: 'albumId' })
  album:AlbumEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

    

}
