import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination/pagination.dto';
import { ResGroupCourseDto } from './res.group-course.dto';

export class PaginationGroupCourseDto extends PaginationDto {
  @ApiProperty({
    isArray: true,
    type: ResGroupCourseDto,
  })
  items: ResGroupCourseDto[];

  constructor(items, meta, links) {
    super(meta, links);
    this.items = items;
  }
}
