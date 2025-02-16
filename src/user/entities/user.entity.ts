import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ListenersEntity } from '../../listeners/entities/listener.entity';
import { RolesEnum } from '../../auth/role/role';
import { FavoritesEntity } from '../../favorites/entities/favorite.entity';
import { MusicEntity } from '../../music/entities/music.entity';
import { PlaylistEntity } from '../../playlist/entities/playlist.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({type: 'varchar',select:false})
  password: string;

  @Column({type: 'enum', enum: RolesEnum, default: RolesEnum.User})
  role: RolesEnum;

  @Column({type: 'boolean', default: false})
  blocked:boolean;

  @OneToMany(() => ListenersEntity, (listener) => listener.user)
  musicListened: ListenersEntity[];

  @OneToMany(() => FavoritesEntity, (favorite) => favorite.user)
  favorites: FavoritesEntity[];

  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  playlist: PlaylistEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
