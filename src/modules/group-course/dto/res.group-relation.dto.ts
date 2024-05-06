import { ApiProperty } from '@nestjs/swagger';
import { ResGroupCourseDto } from './res.group-course.dto';

export class ResGroupRelationDto {
  @ApiProperty({
    type: () => ResGroupCourseDto,
  })
  group: ResGroupCourseDto;

  @ApiProperty({
    type: () => ResGroupCourseDto,
  })
  parentGroup: ResGroupCourseDto;
}
