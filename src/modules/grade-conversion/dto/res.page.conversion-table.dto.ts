import { ApiProperty } from '@nestjs/swagger';
import { ResGradeConversionTableDto } from './res.conversion-table.dto';
import { Pagination0Dto } from 'src/modules/pagination/pagination0.dto';

export class PaginationConversionTableDto extends Pagination0Dto {
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
