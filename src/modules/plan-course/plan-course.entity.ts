import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  FourPointGrade,
  LetterGrade,
} from '../grade-conversion/grade-conversion.enum';
import { PlanCourseStatus } from '../plan/plan.enum';
import { PlanEntity } from '../plan/plan.entity';
import { CourseEntity } from '../course/entity/course.entity';

@Entity({ name: 'plan_course' })
export class PlanCourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'plan_id',
    type: 'uuid',
  })
  planId: UUID;

  @Column({
    name: 'base_course_id',
    type: 'uuid',
  })
  baseCourseId: UUID;

  @Column({
    name: 'four_point_grade',
    type: 'float8',
    nullable: true,
    enum: FourPointGrade,
  })
  fourPointGrade: FourPointGrade;

  @Column({
    name: 'letter_grade',
    type: 'varchar',
    nullable: true,
    enum: LetterGrade,
  })
  letterGrade: LetterGrade;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 255,
    enum: PlanCourseStatus,
    default: PlanCourseStatus.NOT_COMPLETED,
  })
  status: PlanCourseStatus;

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

  @ManyToOne(() => PlanEntity, (plan) => plan.courses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'plan_id' })
  plan: PlanEntity;

  @ManyToOne(() => CourseEntity, (baseCourse) => baseCourse.planCourses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'base_course_id' })
  baseCourse: CourseEntity;
}
