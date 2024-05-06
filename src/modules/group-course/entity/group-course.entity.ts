import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GroupCourseType } from '../group-course.enum';
import { GroupCourseRelationEntity } from './group-course-relation.entity';
import { CourseEntity } from '../../course/entity/course.entity';
import { MajorEntity } from '../../major/major.entity';

@Entity({ name: 'group_course' })
export class GroupCourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 255,
    nullable: true,
    enum: GroupCourseType,
  })
  type?: GroupCourseType;

  @Column({
    name: 'min_credits',
    type: 'bigint',
    nullable: true,
  })
  minCredits?: number | null;

  @Column({
    name: 'min_courses',
    type: 'bigint',
    nullable: true,
  })
  minCourses?: number | null;

  @Column({
    name: 'min_groups',
    type: 'bigint',
    nullable: true,
  })
  minGroups?: number | null;

  @Column({
    name: 'major_id',
    type: 'uuid',
    nullable: false,
  })
  majorId?: UUID;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  title?: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description?: string;

  @OneToMany(() => GroupCourseRelationEntity, (relation) => relation.childGroup)
  relationParents: GroupCourseRelationEntity[];

  @OneToMany(
    () => GroupCourseRelationEntity,
    (relation) => relation.parentGroup,
  )
  relationChildren: GroupCourseRelationEntity[];

  @OneToMany(() => CourseEntity, (course) => course.group)
  courses: CourseEntity[];

  @ManyToOne(() => MajorEntity, (major) => major.groupCourses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'major_id' })
  major: MajorEntity;
}
