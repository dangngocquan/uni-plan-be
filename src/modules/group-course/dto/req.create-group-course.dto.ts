import { ApiProperty } from '@nestjs/swagger';
import { GroupCourseType } from '../group-course.enum';
import { IsNumber, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqCreateGroupCourseDto {
  @ApiProperty({
    enum: GroupCourseType,
  })
  type: GroupCourseType;

  @ApiProperty({
    nullable: true,
  })
  @IsNumber()
  minCredits: number | null;

  @ApiProperty({
    nullable: true,
  })
  @IsNumber()
  minCourses: number | null;

  @ApiProperty({
    nullable: true,
  })
  @IsNumber()
  minGroups: number | null;

  @ApiProperty()
  @IsUUID()
  majorId: UUID;

  @ApiProperty({
    nullable: true,
  })
  title: string;

  @ApiProperty({
    nullable: true,
  })
  description: string;
}
