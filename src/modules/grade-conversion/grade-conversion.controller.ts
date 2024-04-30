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
import { GradeConversionService } from './grade-conversion.service';
import { ReqCreateGradeConversionTableDto } from './dto/req.create-table.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ResGradeConversionTableDto } from './dto/res.conversion-table.dto';
import { UUID } from 'crypto';
import { PaginationConversionTableDto } from './dto/res.page.conversion.table.dto';
import { PaginationOptionsDto } from 'src/shared/dto/pagination/pagination.option.dto';
import { ResDeleteResultDto } from 'src/shared/dto/response/res.delete-result.dto';

@Controller('grade-conversion')
@ApiTags('grade-conversion')
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

  @Post('table')
  @ApiCreatedResponse({
    description: 'Create a grade conversion table',
    type: ResGradeConversionTableDto,
  })
  async createTable(
    @Body() dto: ReqCreateGradeConversionTableDto,
  ): Promise<ResGradeConversionTableDto> {
    return this.gradeConversionService.createGradeConversionTable(dto);
  }

  @Put('table/:tableId')
  @ApiOkResponse({
    description: 'Update a grade conversion table',
    type: ResGradeConversionTableDto,
  })
  async updateTable(
    @Param('tableId', ParseUUIDPipe) tableId: UUID,
    @Body() dto: ReqCreateGradeConversionTableDto,
  ): Promise<ReqCreateGradeConversionTableDto> {
    return this.gradeConversionService.updateGradeConversionTables(
      tableId,
      dto,
    );
  }

  @Delete('table/:tableId')
  @ApiOkResponse({
    description: 'Delete a grade conversion table',
    type: ResDeleteResultDto,
  })
  async deleteGradeConversionTable(
    @Param('tableId', ParseUUIDPipe) tableId: UUID,
  ): Promise<ResDeleteResultDto> {
    return this.gradeConversionService.deleteGradeConversionTable(tableId);
  }
}
