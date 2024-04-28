import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeConversionEntity } from './entity/grade-conversion.entity';
import { Repository } from 'typeorm';
import { GradeConversionTableEntity } from './entity/grade-conversion-table.entity';
import { CreateGradeConversionTableDto } from './dto/req.create-table.dto';
import { ResGradeConversionTableDto } from './dto/res.conversion-table.dto';
import { plainToClass } from 'class-transformer';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationOptionsDto } from 'src/shared/dto/pagination/pagination.option.dto';
import { PaginationConversionTableDto } from './dto/res.page.conversion-table.dto';

@Injectable()
export class GradeConversionService {
  constructor(
    @InjectRepository(GradeConversionEntity)
    private readonly gradeConversionRepository: Repository<GradeConversionEntity>,
    @InjectRepository(GradeConversionTableEntity)
    private readonly gradeConversionTableRepository: Repository<GradeConversionTableEntity>,
  ) {}

  async createGradeConversionTable(
    dto: CreateGradeConversionTableDto,
  ): Promise<ResGradeConversionTableDto> {
    let tableEntity = await this.gradeConversionTableRepository.create({
      name: dto.name,
    });
    tableEntity = await this.gradeConversionTableRepository.save(tableEntity);
    const gradeConversionEtities = dto.gradeConversions.map((gradeConversion) =>
      this.gradeConversionRepository.create({
        minTenPointGrade: gradeConversion.minTenPointGrade,
        fourPointGrade: gradeConversion.fourPointGrade,
        letterGrade: gradeConversion.letterGrade,
        conversionTableId: tableEntity.id,
      }),
    );
    await this.gradeConversionRepository.insert(gradeConversionEtities);
    tableEntity.gradeConversions = gradeConversionEtities;
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
      // route: '/grade-conversion/table',
    });
    return new PaginationConversionTableDto(items, meta, links);
  }
}
