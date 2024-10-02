import {
  Column,
  CreateDateColumn,
  DeleteDateColumn, Entity, JoinTable,
  ManyToMany, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MusicEntity } from '../../music/entities/music.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class PlaylistEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => MusicEntity, (music) => music.playlists)
  music: MusicEntity[];

  @ManyToOne(() => UserEntity, (user) => user.playlist, {onDelete: 'CASCADE'})
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}


