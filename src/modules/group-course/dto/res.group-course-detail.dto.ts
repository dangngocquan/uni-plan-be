import { ApiProperty } from '@nestjs/swagger';
import { ResGroupCourseDto } from './res.group-course.dto';

export class ResGroupCourseDetailDto extends ResGroupCourseDto {
  @ApiProperty({
    isArray: true,
    type: () => ResGroupCourseDetailDto,
  })
  children: ResGroupCourseDetailDto[];
}
