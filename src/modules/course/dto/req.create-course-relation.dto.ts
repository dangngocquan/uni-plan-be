import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqCreateCourseRelationDto {
  @ApiProperty()
  @IsUUID()
  courseId: UUID;

  @ApiProperty()
  @IsUUID()
  prereqCourseId: UUID;
}
