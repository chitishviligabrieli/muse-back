import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MusicEntity } from '../../music/entities/music.entity';
import { ListenersEntity } from '../../listeners/entities/listener.entity';


@Entity({name:'files'})

export class FileEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    imageUrl:string

    @Column()
    coverUrl: string

    @Column()
    key:string

    @Column()
    bucket:string

    @Column()
    fileName:string
}