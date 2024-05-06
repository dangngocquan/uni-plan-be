import { UUID } from 'crypto';
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { GroupCourseEntity } from './group-course.entity';

@Entity({ name: 'group_course_relation' })
export class GroupCourseRelationEntity {
  @PrimaryColumn({
    name: 'group_id',
    type: 'uuid',
    nullable: false,
  })
  groupId: UUID;

  @PrimaryColumn({
    name: 'parent_group_id',
    type: 'uuid',
    nullable: false,
  })
  parentGroupId: UUID;

  @ManyToOne(() => GroupCourseEntity, (group) => group.relationParents, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'group_id' })
  childGroup: GroupCourseEntity;

  @ManyToOne(() => GroupCourseEntity, (group) => group.relationChildren, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_group_id' })
  parentGroup: GroupCourseEntity;
}
