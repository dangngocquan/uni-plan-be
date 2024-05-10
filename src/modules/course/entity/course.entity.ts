import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupCourseEntity } from '../../group-course/entity/group-course.entity';
import { CourseRelationEntity } from './course-relation.entity';

@Entity({ name: 'course' })
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 255,
  })
  code: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'credits',
    type: 'bigint',
  })
  credits: number;

  @Column({
    name: 'group_id',
    type: 'uuid',
  })
  groupId: UUID;

  @ManyToOne(() => GroupCourseEntity, (group) => group.courses)
  @JoinColumn({ name: 'group_id' })
  group: GroupCourseEntity;

  @OneToMany(() => CourseRelationEntity, (relation) => relation.course)
  prereqCourseRelations: CourseRelationEntity[];
}
