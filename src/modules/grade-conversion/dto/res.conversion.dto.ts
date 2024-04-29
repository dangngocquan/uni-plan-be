import { ApiProperty } from '@nestjs/swagger';

export class ResGradeConversionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  minTenPointGrade: number;

  @ApiProperty()
  fourPointGrade: number;

  @ApiProperty()
  letterGrade: string;

  @ApiProperty()
  conversionTableId: string;
}
