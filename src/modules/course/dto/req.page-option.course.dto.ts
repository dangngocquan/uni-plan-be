import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationOptionsDto } from '../../../shared/dto/pagination/pagination.option.dto';
import { UUID } from 'crypto';
import { IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class PageOptionCourseDto extends PaginationOptionsDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  id: UUID[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  code: string[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  name: string[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  credits: number[];

  @ApiPropertyOptional()
  @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
  groupId: UUID[];
}
