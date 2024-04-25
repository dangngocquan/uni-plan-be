import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SchoolEntity } from '../school/school.entity';

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

  @ManyToOne(() => SchoolEntity, (school) => school.majors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'school_id' })
  school: SchoolEntity;
}
