import { Controller, Get, Query } from '@nestjs/common';
import { CourseService } from './course.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionCourseDto } from './dto/req.page-option.course.dto';
import { PaginationCourseDto } from './dto/res.page.course.dto';

@Controller('course')
@ApiTags('Course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all courses',
    type: PaginationCourseDto,
  })
  async get(@Query() dto: PageOptionCourseDto): Promise<PaginationCourseDto> {
    return this.courseService.get(dto);
  }
}
