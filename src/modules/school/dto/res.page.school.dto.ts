import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination/pagination.dto';
import { ResSchoolDto } from './res.school.dto';

export class PaginationSchoolDto extends PaginationDto {
  @ApiProperty({
    isArray: true,
    type: ResSchoolDto,
  })
  items: ResSchoolDto[];

  constructor(items, meta, links) {
    super(meta, links);
    this.items = items;
  }
}
