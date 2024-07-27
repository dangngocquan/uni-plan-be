import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationOptionsDto } from '../../../shared/dto/pagination/pagination.option.dto';
import { UUID } from 'crypto';
import { IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageOptionCourseDto extends PaginationOptionsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  @IsOptional()
  id: UUID[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  @IsOptional()
  code: string[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  @IsOptional()
  name: string[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  @IsOptional()
  credits: number[];

  @ApiPropertyOptional()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsOptional()
  groupId: UUID[];
}
