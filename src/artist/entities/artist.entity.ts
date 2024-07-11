import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ArtistEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({type:"simple-array"})
    musics: string[];

    @Column()
    biography: string;

    @CreateDateColumn()
    createdAt:Date;

    @CreateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    deletedAt: Date;
}
