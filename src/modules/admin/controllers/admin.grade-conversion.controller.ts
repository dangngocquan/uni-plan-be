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
import { GradeConversionService } from '../../grade-conversion/grade-conversion.service';
import { ResGradeConversionTableDto } from '../../grade-conversion/dto/res.conversion-table.dto';
import { ReqCreateGradeConversionTableDto } from '../../grade-conversion/dto/req.create-table.dto';

@Controller('admin/grade-conversion')
@ApiTags('Admin Grade Conversion')
export class AdminMajorController {
  constructor(
    private readonly gradeConversionService: GradeConversionService,
  ) {}

  @Post('table')
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
  @ApiBearerAuth()
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
