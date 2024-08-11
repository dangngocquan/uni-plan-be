import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqUpdateCourseRelationDto {
  @ApiProperty()
  @IsString()
  prereqCourseCode: string;
}
