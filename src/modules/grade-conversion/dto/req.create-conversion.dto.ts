import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { LetterGrade } from '../grade-conversion.enum';

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

  @ApiProperty({
    enum: LetterGrade,
  })
  @IsString()
  @IsEnum(LetterGrade)
  letterGrade: LetterGrade;
}
