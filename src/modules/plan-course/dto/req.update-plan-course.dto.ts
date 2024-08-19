import { ApiProperty } from '@nestjs/swagger';
import { LetterGrade } from '../../grade-conversion/grade-conversion.enum';

export class ReqUpdatePlanCourseDto {
  @ApiProperty({
    default: LetterGrade.A_PLUS,
    // enum: LetterGrade,
  })
  // @IsEnum(LetterGrade)
  letterGrade: LetterGrade | null;
}
