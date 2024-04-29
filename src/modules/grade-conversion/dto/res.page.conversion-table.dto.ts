import { ApiProperty } from '@nestjs/swagger';
import { ResGradeConversionTableDto } from './res.conversion-table.dto';
import { PaginationDto } from 'src/shared/dto/pagination/pagination0.dto';

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
