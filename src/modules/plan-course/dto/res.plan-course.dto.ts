import { ApiProperty } from '@nestjs/swagger';
import { PlanCourseStatus } from '../../plan/plan.enum';
import { ResCourseDto } from '../../course/dto/res.course.dto';

export class ResPlanCourseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  planId: string;

  @ApiProperty()
  baseCourseId: string;

  @ApiProperty()
  fourPointGrade: number;

  @ApiProperty()
  letterGrade: number;

  @ApiProperty()
  status: PlanCourseStatus;

  @ApiProperty({
    type: ResCourseDto,
  })
  baseCourse: ResCourseDto;
}
