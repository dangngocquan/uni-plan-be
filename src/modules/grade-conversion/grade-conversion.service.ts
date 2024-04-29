import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeConversionEntity } from './entity/grade-conversion.entity';
import { Repository } from 'typeorm';
import { GradeConversionTableEntity } from './entity/grade-conversion-table.entity';
import { ReqCreateGradeConversionTableDto } from './dto/req.create-table.dto';
import { ResGradeConversionTableDto } from './dto/res.conversion-table.dto';
import { plainToClass } from 'class-transformer';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationOptionsDto } from 'src/modules/pagination/pagination.option.dto';
import { PaginationConversionTableDto } from './dto/res.page.conversion.table.dto';
import { UUID } from 'crypto';
import { ResDeleteResultDto } from 'src/shared/dto/response/res.delete-result.dto';

@Injectable()
export class GradeConversionService {
  constructor(
    @InjectRepository(GradeConversionEntity)
    private readonly gradeConversionRepository: Repository<GradeConversionEntity>,
    @InjectRepository(GradeConversionTableEntity)
    private readonly gradeConversionTableRepository: Repository<GradeConversionTableEntity>,
  ) {}

  async createGradeConversionTable(
    dto: ReqCreateGradeConversionTableDto,
  ): Promise<ResGradeConversionTableDto> {
    let tableEntity = await this.gradeConversionTableRepository.create({
      name: dto.name,
    });
    tableEntity = await this.gradeConversionTableRepository.save(tableEntity);
    const gradeConversionEntities = dto.gradeConversions.map(
      (gradeConversion) =>
        this.gradeConversionRepository.create({
          fromTenPointGrade: gradeConversion.fromTenPointGrade,
          toTenPointGrade: gradeConversion.toTenPointGrade,
          labelTenPointGrade: gradeConversion.labelTenPointGrade,
          fourPointGrade: gradeConversion.fourPointGrade,
          letterGrade: gradeConversion.letterGrade,
          conversionTableId: tableEntity.id,
        }),
    );
    await this.gradeConversionRepository.insert(gradeConversionEntities);
    tableEntity.gradeConversions = gradeConversionEntities;
    return plainToClass(ResGradeConversionTableDto, tableEntity);
  }

  async getGradeConversionTables(
    pageOptionDto: PaginationOptionsDto,
  ): Promise<PaginationConversionTableDto> {
    const queryBuider = this.gradeConversionTableRepository
      .createQueryBuilder('table')
      .leftJoinAndSelect('table.gradeConversions', 'conversions');
    const { items, meta, links } = await paginate(queryBuider, {
      page: pageOptionDto.page,
      limit: pageOptionDto.limit,
      route: 'api/grade-conversion/table',
    });
    return new PaginationConversionTableDto(items, meta, links);
  }

  async updateGradeConversionTables(
    tableId: UUID,
    dto: ReqCreateGradeConversionTableDto,
  ): Promise<ReqCreateGradeConversionTableDto> {
    // Find grade conversion table
    const tableEntity = await this.gradeConversionTableRepository
      .createQueryBuilder('table')
      .where(`table.id = '${tableId}'`)
      .getOne();
    if (!tableEntity) {
      throw new NotFoundException({
        describe: 'Table not found.',
      });
    }
    // Update grade conversion table
    tableEntity.name = dto.name;
    await this.gradeConversionTableRepository.save(tableEntity);

    // Delete old grade conversions
    const gradeConversionQueryBuilder =
      this.gradeConversionRepository.createQueryBuilder();
    await gradeConversionQueryBuilder
      .delete()
      .from(GradeConversionEntity)
      .where(`conversionTableId = '${tableId}'`)
      .execute();
    // Insert new grade conversions
    const gradeConversionEntities = dto.gradeConversions.map(
      (gradeConversion) =>
        this.gradeConversionRepository.create({
          fromTenPointGrade: gradeConversion.fromTenPointGrade,
          toTenPointGrade: gradeConversion.toTenPointGrade,
          labelTenPointGrade: gradeConversion.labelTenPointGrade,
          fourPointGrade: gradeConversion.fourPointGrade,
          letterGrade: gradeConversion.letterGrade,
          conversionTableId: tableEntity.id,
        }),
    );
    await this.gradeConversionRepository.insert(gradeConversionEntities);
    tableEntity.gradeConversions = gradeConversionEntities;
    return plainToClass(ResGradeConversionTableDto, tableEntity);
  }

  async deleteGradeConversionTable(tableId: UUID): Promise<ResDeleteResultDto> {
    const deleteResult =
      await this.gradeConversionTableRepository.delete(tableId);
    return plainToClass(ResDeleteResultDto, deleteResult);
  }
}
