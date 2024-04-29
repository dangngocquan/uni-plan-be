import { ApiProperty } from '@nestjs/swagger';
import { ReqCreateGradeConversionDto } from './req.create-conversion.dto';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ReqCreateGradeConversionTableDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    isArray: true,
    type: ReqCreateGradeConversionDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReqCreateGradeConversionDto)
  gradeConversions: ReqCreateGradeConversionDto[];
}
