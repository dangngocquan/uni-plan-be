import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GradeConversionEntity } from './entity/grade-conversion.entity';
import { Repository } from 'typeorm';
import { GradeConversionTableEntity } from './entity/grade-conversion-table.entity';
import { ReqCreateGradeConversionTableDto } from './dto/req.create-table.dto';
import { ResGradeConversionTableDto } from './dto/res.conversion-table.dto';
import { plainToClass } from 'class-transformer';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationConversionTableDto } from './dto/res.page.conversion.table.dto';
import { UUID } from 'crypto';
import { PaginationOptionsDto } from '../../shared/dto/pagination/pagination.option.dto';
import { ResDeleteResultDto } from '../../shared/dto/response/res.delete-result.dto';
import { GradeConversionType } from './grade-conversion.enum';

export interface IGradeInfo {
  from: number;
  to: number;
  tenPointGrade: number | null;
  fourPointGrade: number;
  letterGrade: string;
}

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
      type: dto.type,
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
  ): Promise<ResGradeConversionTableDto> {
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

  async getGradeConversionTable(): Promise<ResGradeConversionTableDto> {
    const tableEntity = await this.gradeConversionTableRepository
      .createQueryBuilder('table')
      .where(`table.type = '${GradeConversionType.GRADE}'`)
      .leftJoinAndSelect('table.gradeConversions', 'gradeConversions')
      .orderBy({
        'gradeConversions.fromTenPointGrade': 'DESC',
      })
      .getOne();
    if (!tableEntity) {
      throw new NotFoundException({
        describe: 'Default table not found.',
      });
    }
    return plainToClass(ResGradeConversionTableDto, tableEntity);
  }

  async getGradeCongraduationConversionTable(): Promise<ResGradeConversionTableDto> {
    const tableEntity = await this.gradeConversionTableRepository
      .createQueryBuilder('table')
      .where(`table.type = '${GradeConversionType.CONGRADUATION}'`)
      .leftJoinAndSelect('table.gradeConversions', 'gradeConversions')
      .orderBy({
        'gradeConversions.fromTenPointGrade': 'DESC',
      })
      .getOne();
    if (!tableEntity) {
      throw new NotFoundException({
        describe: 'Default table not found.',
      });
    }
    return plainToClass(ResGradeConversionTableDto, tableEntity);
  }

  async getGradeInfo(tenPointGrade: number): Promise<IGradeInfo> {
    const value = Math.round(tenPointGrade * 10) / 10;
    const table = await this.getGradeConversionTable();
    for (let i = 0; i < table.gradeConversions.length; i++) {
      const conversion = table.gradeConversions[i];
      if (
        conversion.fromTenPointGrade <= value &&
        conversion.toTenPointGrade >= value
      ) {
        return {
          from: conversion.fromTenPointGrade,
          to: conversion.toTenPointGrade,
          tenPointGrade: value,
          fourPointGrade: conversion.fourPointGrade,
          letterGrade: conversion.letterGrade,
        };
      }
    }
    throw new NotFoundException({
      message: 'Grade not found.',
    });
  }

  async getGradeCongraduationInfo(fourPointGrade: number): Promise<IGradeInfo> {
    const value = Math.round(fourPointGrade * 100) / 100;
    const table = await this.getGradeCongraduationConversionTable();
    for (let i = 0; i < table.gradeConversions.length; i++) {
      const conversion = table.gradeConversions[i];
      if (
        conversion.fromTenPointGrade <= value &&
        conversion.toTenPointGrade >= value
      ) {
        return {
          from: conversion.fromTenPointGrade,
          to: conversion.toTenPointGrade,
          tenPointGrade: null,
          fourPointGrade: value,
          letterGrade: conversion.letterGrade,
        };
      }
    }
    throw new NotFoundException({
      message: 'Grade not found.',
    });
  }
}
