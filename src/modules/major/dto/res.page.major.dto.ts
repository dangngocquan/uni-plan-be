import { ApiProperty } from '@nestjs/swagger';
import { ResMajorDto } from './res.major.dto';
import { PaginationDto } from '../../../shared/dto/pagination/pagination.dto';

export class PaginationMajorDto extends PaginationDto {
  @ApiProperty({
    isArray: true,
    type: ResMajorDto,
  })
  items: ResMajorDto[];

  constructor(items, meta, links) {
    super(meta, links);
    this.items = items;
  }
}
