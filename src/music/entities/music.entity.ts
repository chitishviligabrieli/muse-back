import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Music {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    artistId: number;

    @Column({ type: 'int' })
    duration: number;

}
