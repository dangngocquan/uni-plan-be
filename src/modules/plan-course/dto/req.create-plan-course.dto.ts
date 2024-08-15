import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqCreatePlanCourseDto {
  @ApiProperty({
    isArray: true,
    type: String,
  })
  @IsUUID(undefined, { each: true })
  baseCourseIds: UUID[];
}
