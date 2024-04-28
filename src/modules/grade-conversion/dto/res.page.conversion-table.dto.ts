import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from 'src/shared/dto/pagination/pagination.dto';
import { ResGradeConversionTableDto } from './res.conversion-table.dto';

export class PaginationConversionTableDto extends PaginationDto {
  @ApiProperty({
    isArray: true,
    type: ResGradeConversionTableDto,
  })
  items: ResGradeConversionTableDto[];

  constructor(items, meta, links) {
    super(meta, links);
    this.items = items;
  }
}
