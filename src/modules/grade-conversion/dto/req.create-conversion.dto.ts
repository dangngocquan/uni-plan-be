import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReqCreateGradeConversionDto {
  @ApiProperty()
  @IsNumber()
  minTenPointGrade: number;

  @ApiProperty()
  @IsNumber()
  fourPointGrade: number;

  @ApiProperty()
  @IsString()
  letterGrade: string;
}
