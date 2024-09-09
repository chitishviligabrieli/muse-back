import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
  JoinTable,
  Column,
} from 'typeorm';
import { MusicEntity } from '../../music/entities/music.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
export class ListenersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => MusicEntity, (music) => music.listeners)
  @JoinTable({
    name: 'music_listeners',
    joinColumn: { name: 'musicId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
  })
  music: MusicEntity[];

  @ManyToMany(() => UserEntity, (user) => user.musicListened)
  @JoinTable({
    name: 'music_listeners',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'musicId', referencedColumnName: 'id' },
  })
  user: UserEntity[];

  @CreateDateColumn()
  listenedAt: Date;
}
