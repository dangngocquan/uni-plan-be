import { ApiProperty } from '@nestjs/swagger';

export class ResCourseRelationDto {
  @ApiProperty({
    type: String,
  })
  courseId: string;

  @ApiProperty({
    type: String,
  })
  prereqCourseCode: string;
}
