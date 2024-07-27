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
import { ResSchoolDto } from '../../school/dto/res.school.dto';
import { SchoolService } from '../../school/school.service';
import { ReqCreateSchoolDto } from '../../school/dto/req.create-school.dto';
import { reqUpdateSchoolDto } from '../../school/dto/req.update-school.dto';
import { UUID } from 'crypto';
import { ResDeleteResultDto } from '../../../shared/dto/response/res.delete-result.dto';

@Controller('admin/school')
@ApiTags('Admin School')
export class AdminSchoolController {
  constructor(private readonly schoolService: SchoolService) {}

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
