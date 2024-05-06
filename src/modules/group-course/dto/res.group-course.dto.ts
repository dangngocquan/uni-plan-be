import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { GroupCourseType } from '../group-course.enum';

export class ResGroupCourseDto {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  type: GroupCourseType;

  @ApiProperty()
  minCredits: number | null;

  @ApiProperty()
  minCourses: number | null;

  @ApiProperty()
  minGroups: number | null;

  @ApiProperty()
  majorId: UUID;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
