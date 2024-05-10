import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateCourseRelationDto {
  @ApiProperty()
  prereqCourseCode: string;
}
