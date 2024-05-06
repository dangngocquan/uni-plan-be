import { ApiProperty } from '@nestjs/swagger';
import { ResMajorDto } from './res.major.dto';
import { ResGroupCourseDetailDto } from '../../group-course/dto/res.group-course-detail.dto';

export class ResMajorDetailDto extends ResMajorDto {
  @ApiProperty({
    isArray: true,
    type: ResGroupCourseDetailDto,
  })
  groupCourses: ResGroupCourseDetailDto[];
}
