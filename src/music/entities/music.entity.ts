import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ListenersEntity } from '../../listeners/entities/listener.entity';
import { FileEntity } from '../../files/entities/file.entity';


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
  album: AlbumEntity[];

  // @ManyToOne(() => FileEntity)
  // file: FileEntity;

  @OneToMany(() => ListenersEntity, (listener) => listener.music)
  listeners: ListenersEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;


}
