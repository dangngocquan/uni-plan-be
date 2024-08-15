import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { LetterGrade } from '../../grade-conversion/grade-conversion.enum';

export class ReqUpdatePlanCourseDto {
  @ApiProperty({
    default: LetterGrade.A_PLUS,
    type: String,
    enum: LetterGrade,
  })
  @IsEnum(LetterGrade)
  letterGrade: LetterGrade;
}
