import { ApiProperty } from '@nestjs/swagger';
import { ResPlanDto } from './res.plan.dto';
import { ResPlanCourseDto } from '../../plan-course/dto/res.plan-course.dto';

export class GradeStatus {
  @ApiProperty()
  grade: string;

  @ApiProperty()
  count: number;
}

export class ResPlanSummary {
  @ApiProperty()
  totalCourses: number;

  @ApiProperty()
  totalCredits: number;

  @ApiProperty()
  numberCoursesCompleted: number;

  @ApiProperty()
  numberCreditsCompleted: number;

  @ApiProperty()
  currentCPA: number;

  @ApiProperty({
    isArray: true,
    type: GradeStatus,
  })
  grades: GradeStatus[];
}

export class ResponseGradeCPAStatus {
  @ApiProperty()
  minCPA: number;

  @ApiProperty()
  minRoundCPA: number;

  @ApiProperty()
  maxCPA: number;

  @ApiProperty()
  maxRoundCPA: number;

  @ApiProperty()
  calculatorCPA: {
    grade: string;
    status: string;
    fourPointGrade: number;
    label: string;
    details: {
      case1: {
        id: string;
        fromTenPointGrade: number;
        toTenPointGrade: number;
        labelTenPointGrade: number;
        fourPointGrade: number;
        letterGrade: string;
        conversionTableId: string;
        count: number;
      }[];
      case2: {
        id: string;
        fromTenPointGrade: number;
        toTenPointGrade: number;
        labelTenPointGrade: number;
        fourPointGrade: number;
        letterGrade: string;
        conversionTableId: string;
        count: number;
      }[];
    };
  }[];
}

export class ResPlanDetailDto extends ResPlanDto {
  @ApiProperty({
    isArray: true,
    type: ResPlanCourseDto,
  })
  courses: ResPlanCourseDto[];

  @ApiProperty({
    type: ResPlanSummary,
  })
  summary: ResPlanSummary;

  @ApiProperty({
    type: ResponseGradeCPAStatus,
  })
  cpaStatus: ResponseGradeCPAStatus;
}
