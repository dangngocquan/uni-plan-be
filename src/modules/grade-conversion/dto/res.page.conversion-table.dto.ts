import { ApiProperty } from '@nestjs/swagger';
import { ResGradeConversionTableDto } from './res.conversion-table.dto';
import { PaginationMetaDto } from 'src/modules/pagination/meta.dto';
import { PaginationLinkDto } from 'src/modules/pagination/links.dto';

export class PaginationConversionTableDto {
  @ApiProperty({
    isArray: true,
    type: ResGradeConversionTableDto,
  })
  items: ResGradeConversionTableDto[];

  @ApiProperty({
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  @ApiProperty({
    type: PaginationLinkDto,
  })
  links: PaginationLinkDto;

  constructor(items, meta, links) {
    this.items = items;
    this.meta = meta;
    this.links = links;
  }
}
