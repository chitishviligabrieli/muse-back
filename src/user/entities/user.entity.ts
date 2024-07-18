import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'varchar'})
  email: string;

  @Column({type: 'varchar', select: false})
  password: string;
}
