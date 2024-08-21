import { ApiProperty } from '@nestjs/swagger';
import { ReqCreateGradeConversionDto } from './req.create-conversion.dto';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GradeConversionType } from '../grade-conversion.enum';

export class ReqCreateGradeConversionTableDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEnum(GradeConversionType)
  type: GradeConversionType;

  @ApiProperty({
    isArray: true,
    type: ReqCreateGradeConversionDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReqCreateGradeConversionDto)
  gradeConversions: ReqCreateGradeConversionDto[];
}
