import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReqCreateGradeConversionDto {
  @ApiProperty()
  @IsNumber()
  fromTenPointGrade: number;

  @ApiProperty()
  @IsNumber()
  toTenPointGrade: number;

  @ApiProperty()
  @IsString()
  labelTenPointGrade: string;

  @ApiProperty()
  @IsNumber()
  fourPointGrade: number;

  @ApiProperty()
  @IsString()
  letterGrade: string;
}
