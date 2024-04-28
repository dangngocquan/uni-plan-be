import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { GradeConversionService } from './grade-conversion.service';
import { CreateGradeConversionTableDto } from './dto/req.create-table.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResGradeConversionTableDto } from './dto/res.conversion-table.dto';
import { PaginationOptionsDto } from 'src/shared/dto/pagination/pagination.option.dto';
import { PaginationConversionTableDto } from './dto/res.page.conversion-table.dto';

@Controller('grade-conversion')
@ApiTags('grade-conversion')
export class GradeConversionController {
  constructor(
    private readonly gradeConversionService: GradeConversionService,
  ) {}

  @Post('table')
  @ApiCreatedResponse({
    description: 'Create a grade conversion table',
    type: ResGradeConversionTableDto,
  })
  async createTable(
    @Body() dto: CreateGradeConversionTableDto,
  ): Promise<ResGradeConversionTableDto> {
    return this.gradeConversionService.createGradeConversionTable(dto);
  }

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
