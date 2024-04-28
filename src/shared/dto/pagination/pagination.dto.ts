import { ApiProperty } from '@nestjs/swagger';
import { PaginationLinkDto } from './links.dto';
import { PaginationMetaDto } from './meta.dto';

export class PaginationDto {
  @ApiProperty({
    type: PaginationMetaDto,
  })
  meta: PaginationMetaDto;

  @ApiProperty({
    type: PaginationLinkDto,
  })
  links: PaginationLinkDto;

  constructor(meta, links) {
    this.meta = meta;
    this.links = links;
  }
}
