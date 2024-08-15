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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlanCourseService } from './plan-course.service';
import { Auth, AuthUser } from '../../shared/decorators/auth-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ReqCreatePlanCourseDto } from './dto/req.create-plan-course.dto';
import { UUID } from 'crypto';
import { ResPlanCourseDto } from './dto/res.plan-course.dto';
import { ReqUpdatePlanCourseDto } from './dto/req.update-plan-course.dto';
import { PaginationPlanCourseDto } from './dto/res.page.plan-course.dto';
import { PageOptionPlanCourseDto } from './dto/req.page-option.major.dto';

@Controller('plan-course')
@ApiTags('Plan Courses')
export class PlanCourseController {
  constructor(private readonly planCourseService: PlanCourseService) {}

  @Get()
  @Auth()
  @ApiOkResponse({
    description: 'Get all plan of user',
    type: PaginationPlanCourseDto,
  })
  async get(
    @Query() dto: PageOptionPlanCourseDto,
    @AuthUser() user: UserEntity,
  ): Promise<PaginationPlanCourseDto> {
    return this.planCourseService.findAll(user, dto);
  }

  @Post('/:planId')
  @Auth()
  @ApiOkResponse({
    description: 'Create course plan',
    type: String,
  })
  async create(
    @AuthUser() user: UserEntity,
    @Body() dto: ReqCreatePlanCourseDto,
    @Param('planId', ParseUUIDPipe) planId: UUID,
  ): Promise<string> {
    return this.planCourseService.create(user, planId, dto);
  }

  @Put('/:planId')
  @Auth()
  @ApiOkResponse({
    description: 'Update a plan course',
    type: ResPlanCourseDto,
  })
  async update(
    @AuthUser() user: UserEntity,
    @Body() dto: ReqUpdatePlanCourseDto,
    @Param('planId', ParseUUIDPipe) id: UUID,
  ): Promise<ResPlanCourseDto> {
    return this.planCourseService.update(user, id, dto);
  }

  @Delete('/:planId')
  @Auth()
  @ApiOkResponse({
    description: 'Delete a plan course',
    type: ResPlanCourseDto,
  })
  async delete(
    @AuthUser() user: UserEntity,
    @Param('planId', ParseUUIDPipe) id: UUID,
  ): Promise<ResPlanCourseDto> {
    return this.planCourseService.delete(user, id);
  }
}
