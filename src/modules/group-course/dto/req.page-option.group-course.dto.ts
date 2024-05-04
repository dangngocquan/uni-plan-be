import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationOptionsDto } from '../../../shared/dto/pagination/pagination.option.dto';
import { UUID } from 'crypto';
import { GroupCourseType } from '../group-course.enum';

export class PageOptionGroupCourseDto extends PaginationOptionsDto {
  @ApiPropertyOptional()
  majorId: UUID;

  @ApiPropertyOptional()
  schoolId: UUID;

  @ApiPropertyOptional({
    nullable: true,
    enum: GroupCourseType,
  })
  type: GroupCourseType;
}
