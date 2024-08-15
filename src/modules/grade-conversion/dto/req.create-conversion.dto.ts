import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { FourPointGrade, LetterGrade } from '../grade-conversion.enum';

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

  @ApiProperty({
    enum: FourPointGrade,
  })
  @IsNumber()
  @IsEnum(FourPointGrade)
  fourPointGrade: FourPointGrade;

  @ApiProperty({
    enum: LetterGrade,
  })
  @IsString()
  @IsEnum(LetterGrade)
  letterGrade: LetterGrade;
}
