import { UUID } from 'crypto';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CourseEntity } from './course.entity';

@Entity({ name: 'course_relation' })
export class CourseRelationEntity {
  @PrimaryColumn({
    name: 'course_id',
    type: 'uuid',
    nullable: false,
  })
  courseId: UUID;

  @PrimaryColumn({
    name: 'prereq_course_id',
    type: 'uuid',
    nullable: false,
  })
  prereqCourseId: UUID;

  @ManyToOne(() => CourseEntity, (course) => course.prereqCourses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  dueToCourse: CourseEntity;

  @ManyToOne(() => CourseEntity, (course) => course.dueToCourses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'prereq_course_id' })
  prereqCourse: CourseEntity;
}
