import { ApiProperty } from '@nestjs/swagger';
import { ResGroupCourseDto } from './res.group-course.dto';
import { ResCourseDto } from '../../course/dto/res.course.dto';
import { ReqCreateGroupRelationDto } from './req.create-group-relation.dto';

export class ResGroupCourseDetailDto extends ResGroupCourseDto {
  @ApiProperty({
    isArray: true,
    type: () => ResGroupCourseDetailDto,
  })
  relationChildren: ReqCreateGroupRelationDto[];

  @ApiProperty({
    isArray: true,
    type: () => ResGroupCourseDetailDto,
  })
  courses: ResCourseDto[];

  @ApiProperty({
    isArray: true,
    type: () => ResGroupCourseDetailDto,
  })
  children: ResGroupCourseDetailDto[];
}
