import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination/pagination.dto';
import { ResCourseDto } from './res.course.dto';

export class PaginationCourseDto extends PaginationDto {
  @ApiProperty({
    isArray: true,
    type: ResCourseDto,
  })
  items: ResCourseDto[];

  constructor(items, meta, links) {
    super(meta, links);
    this.items = items;
  }
}
