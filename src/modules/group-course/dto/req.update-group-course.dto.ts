import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReqUpdateGroupCourseDto {
  @ApiProperty({
    nullable: true,
    minimum: 0,
  })
  @IsNumber()
  minCredits: number | null;

  @ApiProperty({
    nullable: true,
    minimum: 0,
  })
  @IsNumber()
  minCourses: number | null;

  @ApiProperty({
    nullable: true,
    minimum: 0,
  })
  @IsNumber()
  minGroups: number | null;

  @ApiProperty({
    nullable: true,
  })
  title: string;

  @ApiProperty({
    nullable: true,
  })
  description: string;
}
