import { ApiProperty } from '@nestjs/swagger';

export class ResGradeConversionDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fromTenPointGrade: number;

  @ApiProperty()
  toTenPointGrade: number;

  @ApiProperty()
  labelTenPointGrade: string;

  @ApiProperty()
  fourPointGrade: number;

  @ApiProperty()
  letterGrade: string;

  @ApiProperty()
  conversionTableId: string;
}
