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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
