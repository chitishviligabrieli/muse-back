import {
  Column, CreateDateColumn, DeleteDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { MusicEntity } from '../../music/entities/music.entity';
@Entity()
export class FavoritesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.favorites)
  user: UserEntity;

  @ManyToOne(() => MusicEntity, (music) => music.favorites)
  music: MusicEntity;

  @CreateDateColumn()
  createdAt: Date;
}
