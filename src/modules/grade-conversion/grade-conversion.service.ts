import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeConversionEntity } from './entity/grade-conversion.entity';
import { Repository } from 'typeorm';
import { GradeConversionTableEntity } from './entity/grade-conversion-table.entity';
import { ReqCreateGradeConversionTableDto } from './dto/req.create-table.dto';
import { ResGradeConversionTableDto } from './dto/res.conversion-table.dto';
import { plainToClass } from 'class-transformer';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationOptionsDto } from 'src/shared/dto/pagination/pagination.option.dto';
import { PaginationConversionTableDto } from './dto/res.page.conversion-table.dto';
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
          minTenPointGrade: gradeConversion.minTenPointGrade,
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
    const tableEntity = await this.gradeConversionTableRepository
      .createQueryBuilder('table')
      .where(`table.id = '${tableId}'`)
      .getOne();
    if (!tableEntity) {
      throw new NotFoundException({
        describe: 'Table not found.',
      });
    }
    tableEntity.name = dto.name;
    const gradeConversionQueryBuilder =
      this.gradeConversionRepository.createQueryBuilder('conversion');
    await gradeConversionQueryBuilder
      .delete()
      .from(GradeConversionEntity)
      .where(`conversion.tableId = '${tableId}'`)
      .execute();
    const gradeConversionEntities = dto.gradeConversions.map(
      (gradeConversion) =>
        this.gradeConversionRepository.create({
          minTenPointGrade: gradeConversion.minTenPointGrade,
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
