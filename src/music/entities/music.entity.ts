import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn, JoinTable, ManyToMany,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ListenersEntity } from '../../listeners/entities/listener.entity';
import { PlaylistEntity } from '../../playlist/entities/playlist.entity';
import { FavoritesEntity } from '../../favorites/entities/favorite.entity';
import { FileEntity } from '../../files/entities/file.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';


@Entity()
export class MusicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  musicSrc: string

  @Column({nullable: true})
  albumId!: number;

  @Column({ nullable: true})
  artistId!: number;

  @ManyToOne(() => AlbumEntity, (album) => album.music)
  album: AlbumEntity;

  @ManyToMany(() => PlaylistEntity, (playlist) => playlist.music)
  @JoinTable()
  playlists: PlaylistEntity[];

  @ManyToOne(() => ArtistEntity, (artist) => artist.music, { cascade: true })
  @JoinColumn({ name: 'artistId' })
  artist: ArtistEntity;

  @OneToMany(() => ListenersEntity, (listener) => listener.music)
  listeners: ListenersEntity[];

  @OneToMany(() => FavoritesEntity, (Favorite) => Favorite.music)
  favorites: FavoritesEntity[];

  @ManyToOne(() => FileEntity)
  file: FileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
