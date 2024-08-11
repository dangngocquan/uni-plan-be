import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SchoolEntity } from './school.entity';
import { Repository } from 'typeorm';
import { ReqCreateSchoolDto } from './dto/req.create-school.dto';
import { plainToClass } from 'class-transformer';
import { ResSchoolDto } from './dto/res.school.dto';
import { PaginationSchoolDto } from './dto/res.page.school.dto';
import { PaginationOptionsDto } from '../../shared/dto/pagination/pagination.option.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { reqUpdateSchoolDto } from './dto/req.update-school.dto';
import { UUID } from 'crypto';
import { ResDeleteResultDto } from '../../shared/dto/response/res.delete-result.dto';
import { OrderType } from '../../shared/dto/pagination/order.enum';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolEntity)
    private readonly schoolRepository: Repository<SchoolEntity>,
  ) {}

  async getSchools(dto: PaginationOptionsDto): Promise<PaginationSchoolDto> {
    const queryBuider = this.schoolRepository
      .createQueryBuilder('school')
      .where(`LOWER(school.name) LIKE '%${dto.q.toLowerCase().trim()}%'`)
      .orderBy({
        'school.orderIndex': 'ASC',
        'school.name': dto.order === OrderType.ASC ? 'ASC' : 'DESC',
      });
    const { items, meta, links } = await paginate(queryBuider, {
      page: dto.page,
      limit: dto.limit,
      route: 'api/school',
    });
    return new PaginationSchoolDto(items, meta, links);
  }

  async create(dto: ReqCreateSchoolDto): Promise<ResSchoolDto> {
    let schoolEntity = this.schoolRepository.create({
      name: dto.name,
    });
    schoolEntity = await this.schoolRepository.save(schoolEntity);
    return plainToClass(ResSchoolDto, schoolEntity);
  }

  async update(id: UUID, dto: reqUpdateSchoolDto): Promise<ResSchoolDto> {
    let entity = await this.schoolRepository
      .createQueryBuilder('school')
      .where(`school.id = '${id}'`)
      .getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'School not found',
      });
    }
    entity.name = dto.name;
    entity = await this.schoolRepository.save(entity);
    return plainToClass(ResSchoolDto, entity);
  }

  async delete(id: UUID): Promise<ResDeleteResultDto> {
    const deleteResult = await this.schoolRepository.delete(id);
    return plainToClass(ResDeleteResultDto, deleteResult);
  }
}
