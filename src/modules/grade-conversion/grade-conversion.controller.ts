import { Controller, Get, Query } from '@nestjs/common';
import { GradeConversionService } from './grade-conversion.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaginationConversionTableDto } from './dto/res.page.conversion.table.dto';
import { PaginationOptionsDto } from '../../shared/dto/pagination/pagination.option.dto';

@Controller('grade-conversion')
@ApiTags('Grade Conversion')
export class GradeConversionController {
  constructor(
    private readonly gradeConversionService: GradeConversionService,
  ) {}

  @Get('table')
  @ApiOkResponse({
    description: 'Get all grade conversion tables',
    type: PaginationConversionTableDto,
  })
  async getGradeConversionTables(
    @Query() pageOptionDto: PaginationOptionsDto,
  ): Promise<PaginationConversionTableDto> {
    return this.gradeConversionService.getGradeConversionTables(pageOptionDto);
  }
}
