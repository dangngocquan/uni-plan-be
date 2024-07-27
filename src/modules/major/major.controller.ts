import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { MajorService } from './major.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationMajorDto } from './dto/res.page.major.dto';
import { UUID } from 'crypto';
import { PageOptionMajorDto } from './dto/req.page-option.major.dto';
import { ResMajorDetailDto } from './dto/res.major-detail.dto';

@Controller('major')
@ApiTags('Major')
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

  @Get('detail/:majorId')
  @ApiOkResponse({
    description: 'Get details of a major',
    type: ResMajorDetailDto,
  })
  async getDetails(@Param('majorId', ParseUUIDPipe) majorId: UUID) {
    return this.majorService.getDetails(majorId);
  }
}
