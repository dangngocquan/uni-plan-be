import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { GroupCourseService } from './group-course.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PageOptionGroupCourseDto } from './dto/req.page-option.group-course.dto';
import { PaginationGroupCourseDto } from './dto/res.page.group-course.dto';
import { UUID } from 'crypto';
import { ResGroupCourseDetailDto } from './dto/res.group-course-detail.dto';

@Controller('group-course')
@ApiTags('Group Course')
export class GroupCourseController {
  constructor(private readonly groupCourseService: GroupCourseService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get Group Course',
    type: PaginationGroupCourseDto,
  })
  async getGroups(
    @Query() dto: PageOptionGroupCourseDto,
  ): Promise<PaginationGroupCourseDto> {
    return this.groupCourseService.getGroups(dto);
  }

  @Get('details/:groupId')
  @ApiOkResponse({
    description: 'Get group course details',
    type: ResGroupCourseDetailDto,
  })
  async getGroupCourseDetails(
    @Param('groupId', ParseUUIDPipe) groupId: UUID,
  ): Promise<ResGroupCourseDetailDto> {
    return this.groupCourseService.getGroupDetails(groupId);
  }
}
