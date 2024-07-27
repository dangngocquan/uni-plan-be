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
import { MajorService } from '../../major/major.service';
import { ReqCreateMajorDto } from '../../major/dto/req.create-major.dto';
import { ResMajorDto } from '../../major/dto/res.major.dto';
import { ReqUpdateMajorDto } from '../../major/dto/req.update-major.dto';

@Controller('admin/major')
@ApiTags('Admin Major')
export class AdminMajorController {
  constructor(private readonly majorService: MajorService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    description: 'Create a new major',
    type: ResMajorDto,
  })
  async create(@Body() dto: ReqCreateMajorDto): Promise<ResMajorDto> {
    return this.majorService.create(dto);
  }

  @Put(':majorId')
  @ApiBearerAuth()
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
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Delete a major',
    type: ResDeleteResultDto,
  })
  async delete(@Param('majorId', ParseUUIDPipe) majorId: UUID) {
    return this.majorService.delete(majorId);
  }
}
