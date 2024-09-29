import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MusicEntity } from '../../music/entities/music.entity';
import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';


@Entity({name:'files'})

export class FileEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    url:string

    @Column()
    key:string

    @Column()
    bucket:string

    @Column()
    fileName:string

    @OneToMany( () => MusicEntity, (music) => music.file)
    music: MusicEntity[];

    @OneToMany(() => AlbumEntity, (album) => album.file)
    album: AlbumEntity[];

    @OneToMany(() => ArtistEntity, (artist) => artist.file)
    artist: ArtistEntity[];

}