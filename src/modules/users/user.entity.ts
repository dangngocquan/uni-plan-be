import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.enum';
import { PlanEntity } from '../plan/plan.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  password: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name: string;

  @Column({
    name: 'role',
    type: 'varchar',
    length: 255,
    nullable: false,
    default: Role.USER,
  })
  role: Role;

  @Column({
    name: 'avatar',
    type: 'text',
    nullable: true,
    default: null,
  })
  avatar: string | null;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt!: Date;

  @OneToMany(() => PlanEntity, (plan) => plan.owner)
  plans: PlanEntity[];
}
