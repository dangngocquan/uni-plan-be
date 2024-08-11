import { UUID } from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MajorEntity } from '../major/major.entity';

@Entity({ name: 'school' })
export class SchoolEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  name: string;

  @Column({
    name: 'order_index',
    type: 'float',
    default: () => 'extract(epoch from now())',
  })
  orderIndex: number;

  @OneToMany(() => MajorEntity, (major) => major.school)
  majors: MajorEntity[];
}
