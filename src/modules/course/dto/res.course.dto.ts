import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { ResCourseRelationDto } from './res.course-relation.dto';

export class ResCourseDto {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  credits: number;

  @ApiProperty()
  groupId: UUID;

  @ApiProperty({
    isArray: true,
    type: () => ResCourseRelationDto,
  })
  prereqCourseRelations: ResCourseRelationDto[];

  @ApiProperty()
  orderIndex: number;
}
