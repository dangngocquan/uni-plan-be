import { UUID } from 'crypto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GradeConversionTableEntity } from './grade-conversion-table.entity';

@Entity({ name: 'grade_conversion' })
export class GradeConversionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'from_ten_point_grade',
    type: 'float8',
    nullable: true,
  })
  fromTenPointGrade: number;

  @Column({
    name: 'to_ten_point_grade',
    type: 'float8',
    nullable: true,
  })
  toTenPointGrade: number;

  @Column({
    name: 'label_ten_point_grade',
    type: 'varchar',
    nullable: true,
  })
  labelTenPointGrade: string;

  @Column({
    name: 'four_point_grade',
    type: 'float8',
    nullable: true,
  })
  fourPointGrade: number;

  @Column({
    name: 'letter_grade',
    type: 'varchar',
    nullable: true,
  })
  letterGrade: string;

  @Column({
    name: 'conversion_table_id',
    type: 'uuid',
    nullable: false,
  })
  conversionTableId: UUID;

  @ManyToOne(
    () => GradeConversionTableEntity,
    (table) => table.gradeConversions,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'conversion_table_id' })
  gradeConversionTable: GradeConversionTableEntity;
}
