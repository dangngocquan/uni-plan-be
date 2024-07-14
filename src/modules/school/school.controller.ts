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
import { SchoolService } from './school.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResSchoolDto } from './dto/res.school.dto';
import { ReqCreateSchoolDto } from './dto/req.create-school.dto';
import { PaginationOptionsDto } from '../../shared/dto/pagination/pagination.option.dto';
import { PaginationSchoolDto } from './dto/res.page.school.dto';
import { UUID } from 'crypto';
import { reqUpdateSchoolDto } from './dto/req.update-school.dto';
import { ResDeleteResultDto } from '../../shared/dto/response/res.delete-result.dto';

@Controller('school')
@ApiTags('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all schools',
    type: PaginationSchoolDto,
  })
  async getSchools(
    @Query() dto: PaginationOptionsDto,
  ): Promise<PaginationSchoolDto> {
    return this.schoolService.getSchools(dto);
  }

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create a new school',
    type: ResSchoolDto,
  })
  async create(@Body() dto: ReqCreateSchoolDto): Promise<ResSchoolDto> {
    return this.schoolService.create(dto);
  }

  @Put(':schoolId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Update a school',
    type: ResSchoolDto,
  })
  async update(
    @Param('schoolId', ParseUUIDPipe) schoolId: UUID,
    @Body() dto: reqUpdateSchoolDto,
  ): Promise<ResSchoolDto> {
    return this.schoolService.update(schoolId, dto);
  }

  @Delete(':schoolId')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete a school',
    type: ResDeleteResultDto,
  })
  async delete(@Param('schoolId', ParseUUIDPipe) schoolId: UUID) {
    return this.schoolService.delete(schoolId);
  }
}
