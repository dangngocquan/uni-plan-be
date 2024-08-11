import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchoolEntity } from '../school/school.entity';
import { GroupCourseEntity } from '../group-course/entity/group-course.entity';

@Entity({ name: 'major' })
export class MajorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'school_id',
    type: 'uuid',
  })
  schoolId: UUID;

  @Column({
    name: 'order_index',
    type: 'float',
    default: () => 'extract(epoch from now())',
  })
  orderIndex: number;

  @ManyToOne(() => SchoolEntity, (school) => school.majors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;

  @OneToMany(() => GroupCourseEntity, (group) => group.major)
  groupCourses: GroupCourseEntity[];
}
