import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UUID } from 'crypto';
import { ResDeleteResultDto } from '../../../shared/dto/response/res.delete-result.dto';

import { GroupCourseService } from '../../group-course/group-course.service';
import { ResGroupCourseDto } from '../../group-course/dto/res.group-course.dto';
import { ReqCreateGroupCourseDto } from '../../group-course/dto/req.create-group-course.dto';
import { ReqUpdateGroupCourseDto } from '../../group-course/dto/req.update-group-course.dto';
import { ResGroupRelationDto } from '../../group-course/dto/res.group-relation.dto';
import { ReqCreateGroupRelationDto } from '../../group-course/dto/req.create-group-relation.dto';
import { ResCourseDto } from '../../course/dto/res.course.dto';
import { ReqCreateCourseRelationDto } from '../../course/dto/req.create-course-relation.dto';
import { CourseService } from '../../course/course.service';
import { ReqCreateCourseDto } from '../../course/dto/req.create-course.dto';
import { ReqUpdateCourseDto } from '../../course/dto/req.update-course.dto';

@Controller('admin')
@ApiTags('Admin Course')
export class AdminCourseController {
  constructor(
    private readonly groupCourseService: GroupCourseService,
    private readonly courseService: CourseService,
  ) {}

  @Post('group-course/create')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create a new group course',
    type: ResGroupCourseDto,
  })
  async createGroupCourse(
    @Body() dto: ReqCreateGroupCourseDto,
  ): Promise<ResGroupCourseDto> {
    return this.groupCourseService.create(dto);
  }

  @Put('group-course/:groupId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update a group course',
    type: ResGroupCourseDto,
  })
  async updateGroupCourse(
    @Param('groupId', ParseUUIDPipe) groupId: UUID,
    @Body() dto: ReqUpdateGroupCourseDto,
  ): Promise<ResGroupCourseDto> {
    return this.groupCourseService.update(groupId, dto);
  }

  @Delete('group-course/:groupId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete a group course',
    type: ResDeleteResultDto,
  })
  async deleteGroupCourse(@Param('groupId', ParseUUIDPipe) groupId: UUID) {
    return this.groupCourseService.delete(groupId);
  }

  @Post('group-course/relation')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create a new group relation',
    type: ResGroupRelationDto,
  })
  async addRelationGroupCourse(
    @Body() dto: ReqCreateGroupRelationDto,
  ): Promise<ResGroupRelationDto> {
    return this.groupCourseService.addRelation(dto);
  }

  @Post('course/create')
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create a new course',
    type: ResCourseDto,
  })
  async createCourse(@Body() dto: ReqCreateCourseDto): Promise<ResCourseDto> {
    return this.courseService.create(dto);
  }

  @Put('course/:courseId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update a course',
    type: ResCourseDto,
  })
  async updateCourse(
    @Param('courseId', ParseUUIDPipe) courseId: UUID,
    @Body() dto: ReqUpdateCourseDto,
  ): Promise<ResCourseDto> {
    return this.courseService.update(courseId, dto);
  }

  @Delete('course/:courseId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete a course',
    type: ResDeleteResultDto,
  })
  async deleteCourse(@Param('courseId', ParseUUIDPipe) courseId: UUID) {
    return this.courseService.delete(courseId);
  }

  @Post('course/:courseId/relation')
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
