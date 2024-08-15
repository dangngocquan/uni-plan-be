import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanStatus } from './plan.enum';
import { UserEntity } from '../users/user.entity';
import { PlanCourseEntity } from '../plan-course/plan-course.entity';

@Entity({ name: 'plan' })
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'owner_id',
    type: 'uuid',
  })
  ownerId: UUID;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 255,
    enum: PlanStatus,
    default: PlanStatus.DRAFT,
  })
  status: PlanStatus;

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

  @ManyToOne(() => UserEntity, (user) => user.plans, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'owner_id' })
  owner: UserEntity;

  @OneToMany(() => PlanCourseEntity, (planCourse) => planCourse.plan)
  courses: PlanCourseEntity[];
}
