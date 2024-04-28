import { ApiProperty } from '@nestjs/swagger';

export class CreateGradeConversionDto {
  @ApiProperty()
  minTenPointGrade: number;

  @ApiProperty()
  fourPointGrade: number;

  @ApiProperty()
  letterGrade: string;
}
