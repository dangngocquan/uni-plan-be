import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationOptionsDto } from '../../../shared/dto/pagination/pagination.option.dto';
import { UUID } from 'crypto';
import { IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageOptionCourseDto extends PaginationOptionsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  id: UUID[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  code: string[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  name: string[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  @IsArray()
  credits: number[];

  @ApiPropertyOptional()
  @IsArray()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  groupId: UUID[];
}
