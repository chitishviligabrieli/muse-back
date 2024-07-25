import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn, Column,
} from 'typeorm';
import { MusicEntity } from '../../music/entities/music.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class ListenersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  musicId: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => MusicEntity, (music) => music.id)
  @JoinColumn({ name: 'musicId' })
  music: MusicEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @CreateDateColumn()
  listenedAt: Date;
}