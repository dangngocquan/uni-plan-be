import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CourseService } from './course.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PageOptionCourseDto } from './dto/req.page-option.course.dto';
import { PaginationCourseDto } from './dto/res.page.course.dto';
import { ResCourseDto } from './dto/res.course.dto';
import { ReqCreateCourseDto } from './dto/req.create-course.dto';
import { UUID } from 'crypto';
import { ReqUpdateCourseDto } from './dto/req.update-course.dto';
import { ResDeleteResultDto } from '../../shared/dto/response/res.delete-result.dto';
import { ReqCreateCourseRelationDto } from './dto/req.create-course-relation.dto';

@Controller('course')
@ApiTags('course')
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

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create a new course',
    type: ResCourseDto,
  })
  async create(@Body() dto: ReqCreateCourseDto): Promise<ResCourseDto> {
    return this.courseService.create(dto);
  }

  @Put(':courseId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update a course',
    type: ResCourseDto,
  })
  async update(
    @Param('courseId', ParseUUIDPipe) courseId: UUID,
    @Body() dto: ReqUpdateCourseDto,
  ): Promise<ResCourseDto> {
    return this.courseService.update(courseId, dto);
  }

  @Delete(':courseId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete a course',
    type: ResDeleteResultDto,
  })
  async delete(@Param('courseId', ParseUUIDPipe) courseId: UUID) {
    return this.courseService.delete(courseId);
  }

  @Post(':courseId/relation')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Add a prereq course',
    type: ResCourseDto,
  })
  async addPrereqCourse(
    @Param('courseId', ParseUUIDPipe) courseId: UUID,
    @Body() dto: ReqCreateCourseRelationDto,
  ): Promise<ResCourseDto> {
    return this.courseService.addPrereqCourseCode(courseId, dto);
  }
}
