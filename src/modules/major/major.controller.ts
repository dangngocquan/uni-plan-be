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
import { MajorService } from './major.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationMajorDto } from './dto/res.page.major.dto';
import { ResMajorDto } from './dto/res.major.dto';
import { UUID } from 'crypto';
import { ReqCreateMajorDto } from './dto/req.create-major.dto';
import { ReqUpdateMajorDto } from './dto/req.update-major.dto';
import { ResDeleteResultDto } from '../../shared/dto/response/res.delete-result.dto';
import { PageOptionMajorDto } from './dto/req.page-option.major.dto';

@Controller('major')
@ApiTags('major')
export class MajorController {
  constructor(private readonly majorService: MajorService) {}

  @Get()
  @ApiOkResponse({
    description: 'Get all major',
    type: PaginationMajorDto,
  })
  async get(@Query() dto: PageOptionMajorDto): Promise<PaginationMajorDto> {
    return this.majorService.get(dto);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Create a new major',
    type: ResMajorDto,
  })
  async create(@Body() dto: ReqCreateMajorDto): Promise<ResMajorDto> {
    return this.majorService.create(dto);
  }

  @Put(':majorId')
  @ApiOkResponse({
    description: 'Update a major',
    type: ResMajorDto,
  })
  async update(
    @Param('majorId', ParseUUIDPipe) majorId: UUID,
    @Body() dto: ReqUpdateMajorDto,
  ): Promise<ResMajorDto> {
    return this.majorService.update(majorId, dto);
  }

  @Delete(':majorId')
  @ApiOkResponse({
    description: 'Delete a major',
    type: ResDeleteResultDto,
  })
  async delete(@Param('majorId', ParseUUIDPipe) majorId: UUID) {
    return this.majorService.delete(majorId);
  }
}
