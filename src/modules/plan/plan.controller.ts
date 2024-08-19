import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PlanService } from './plan.service';
import { PaginationPlanDto } from './dto/res.page.plan.dto';
import { PaginationOptionsDto } from '../../shared/dto/pagination/pagination.option.dto';
import { Auth, AuthUser } from '../../shared/decorators/auth-user.decorator';
import { UserEntity } from '../users/user.entity';
import { ResPlanDto } from './dto/res.plan.dto';
import { ReqCreatePlanDto } from './dto/req.create-plan.dto';
import { UUID } from 'crypto';
import { ReqUpdatePlanDto } from './dto/req.update-plan.dto';
import { ResPlanDetailDto } from './dto/res.plan-detail.dto';
import { ReqPlanDetailDto } from './dto/req.plan-detail.dto';

@Controller('plan')
@ApiTags('Plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get()
  @Auth()
  @ApiOkResponse({
    description: 'Get all plan of user',
    type: PaginationPlanDto,
  })
  async get(
    @Query() dto: PaginationOptionsDto,
    @AuthUser() user: UserEntity,
  ): Promise<PaginationPlanDto> {
    return this.planService.findAll(user, dto);
  }

  @Post()
  @Auth()
  @ApiOkResponse({
    description: 'Create a plan',
    type: ResPlanDto,
  })
  async create(
    @AuthUser() user: UserEntity,
    @Body() dto: ReqCreatePlanDto,
  ): Promise<ResPlanDto> {
    return this.planService.create(user, dto);
  }

  @Put('/:planId')
  @Auth()
  @ApiOkResponse({
    description: 'Update a plan',
    type: ResPlanDto,
  })
  async update(
    @AuthUser() user: UserEntity,
    @Body() dto: ReqUpdatePlanDto,
    @Param('planId') id: UUID,
  ): Promise<ResPlanDto> {
    return this.planService.update(user, dto, id);
  }

  @Delete('/:planId')
  @Auth()
  @ApiOkResponse({
    description: 'Delete a plan',
    type: ResPlanDto,
  })
  async delete(
    @AuthUser() user: UserEntity,
    @Param('planId') id: UUID,
  ): Promise<ResPlanDto> {
    return this.planService.delete(user, id);
  }

  @Get('detail')
  @Auth()
  @ApiOkResponse({
    description: 'Get plan details',
    type: ResPlanDetailDto,
  })
  async getPlanDetails(
    @AuthUser() user: UserEntity,
    @Query() dto: ReqPlanDetailDto,
  ): Promise<ResPlanDetailDto> {
    return this.planService.getPlanDetails(user, dto.id);
  }
}
