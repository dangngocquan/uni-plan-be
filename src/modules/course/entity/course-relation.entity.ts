import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity({ name: 'course_relation' })
export class CourseRelationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'course_id',
    type: 'uuid',
    nullable: false,
  })
  courseId: UUID;

  @ManyToOne(() => CourseEntity, (course) => course.prereqCourseRelations, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @Column({
    name: 'prereq_course_code',
    type: 'varchar',
    nullable: false,
  })
  prereqCourseCode: string;
}
