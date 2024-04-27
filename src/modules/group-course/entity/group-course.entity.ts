import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GroupCourseType } from '../group-course.enum';
import { GroupCourseRelationEntity } from './group-course-relation.entity';

@Entity({ name: 'group_course' })
export class GroupCourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  type: GroupCourseType;

  @Column({
    name: 'min_credits',
    type: 'bigint',
    nullable: true,
  })
  minCreadits: number | null;

  @Column({
    name: 'min_courses',
    type: 'bigint',
    nullable: true,
  })
  minCourses: number | null;

  @Column({
    name: 'min_groups',
    type: 'bigint',
    nullable: true,
  })
  minGroups: number | null;

  @Column({
    name: 'major_id',
    type: 'uuid',
    nullable: false,
  })
  majorId: UUID;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  title: string;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @OneToMany(() => GroupCourseRelationEntity, (relation) => relation.childGroup)
  children: GroupCourseRelationEntity[];

  @OneToMany(
    () => GroupCourseRelationEntity,
    (relation) => relation.parentGroup,
  )
  parents: GroupCourseRelationEntity[];
}
