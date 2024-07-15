import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    createdAt:Date;

    @CreateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    deletedAt: Date;

}
