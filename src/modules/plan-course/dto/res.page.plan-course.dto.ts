import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination/pagination.dto';
import { ResPlanCourseDto } from './res.plan-course.dto';

export class PaginationPlanCourseDto extends PaginationDto {
  @ApiProperty({
    isArray: true,
    type: ResPlanCourseDto,
  })
  items: ResPlanCourseDto[];

  constructor(items, meta, links) {
    super(meta, links);
    this.items = items;
  }
}
