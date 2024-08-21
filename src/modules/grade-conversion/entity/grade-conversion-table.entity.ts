import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { GradeConversionEntity } from './grade-conversion.entity';
import { GradeConversionType } from '../grade-conversion.enum';

@Entity({ name: 'grade_conversion_table' })
export class GradeConversionTableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
  })
  name: string;

  @Column({
    name: 'type',
    type: 'varchar',
    length: 255,
    default: GradeConversionType.GRADE,
  })
  type: GradeConversionType;

  @OneToMany(
    () => GradeConversionEntity,
    (gradeConversion) => gradeConversion.gradeConversionTable,
  )
  gradeConversions: GradeConversionEntity[];
}
