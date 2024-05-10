import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqCreateCourseRelationDto {
  @ApiProperty()
  @IsUUID()
  courseId: UUID;

  @ApiProperty()
  @IsString()
  prereqCourseCode: string;
}
