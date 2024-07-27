import { Controller, Get, Query } from '@nestjs/common';
import { SchoolService } from './school.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationOptionsDto } from '../../shared/dto/pagination/pagination.option.dto';
import { PaginationSchoolDto } from './dto/res.page.school.dto';

@Controller('school')
@ApiTags('School')
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
}
