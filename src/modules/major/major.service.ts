import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MajorEntity } from './major.entity';
import { Repository } from 'typeorm';
import { PaginationMajorDto } from './dto/res.page.major.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { ReqCreateMajorDto } from './dto/req.create-major.dto';
import { ResMajorDto } from './dto/res.major.dto';
import { plainToClass } from 'class-transformer';
import { UUID } from 'crypto';
import { ReqUpdateMajorDto } from './dto/req.update-major.dto';
import { ResDeleteResultDto } from '../../shared/dto/response/res.delete-result.dto';
import { SchoolEntity } from '../school/school.entity';
import { PageOptionMajorDto } from './dto/req.page-option.major.dto';
import { ResMajorDetailDto } from './dto/res.major-detail.dto';
import { GroupCourseService } from '../group-course/group-course.service';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(MajorEntity)
    private readonly majorRepository: Repository<MajorEntity>,
    @InjectRepository(SchoolEntity)
    private readonly schoolRepository: Repository<SchoolEntity>,
    private readonly groupCourseService: GroupCourseService,
  ) {}

  async get(dto: PageOptionMajorDto): Promise<PaginationMajorDto> {
    const queryBuider = this.majorRepository.createQueryBuilder('major');
    if (dto.schoolId) {
      queryBuider.where(`major.schoolId = '${dto.schoolId}'`);
    }
    const { items, meta, links } = await paginate(queryBuider, {
      page: dto.page,
      limit: dto.limit,
      route: 'api/major',
    });
    return new PaginationMajorDto(items, meta, links);
  }

  async create(dto: ReqCreateMajorDto): Promise<ResMajorDto> {
    const schoolEntity = await this.schoolRepository
      .createQueryBuilder('school')
      .where(`school.id = '${dto.schoolId}'`)
      .getOne();
    if (!schoolEntity) {
      throw new NotFoundException({
        message: 'School not found',
      });
    }
    let entity = await this.majorRepository.create({
      name: dto.name,
      schoolId: dto.schoolId,
    });
    entity = await this.majorRepository.save(entity);
    return plainToClass(ResMajorDto, entity);
  }

  async update(majorId: UUID, dto: ReqUpdateMajorDto): Promise<ResMajorDto> {
    let entity = await this.majorRepository
      .createQueryBuilder('major')
      .where(`major.id = '${majorId}'`)
      .getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'Major not found',
      });
    }
    entity.name = dto.name;
    entity = await this.majorRepository.save(entity);
    return plainToClass(ResMajorDto, entity);
  }

  async delete(majorId: UUID): Promise<ResDeleteResultDto> {
    const result = await this.majorRepository.delete(majorId);
    return plainToClass(ResDeleteResultDto, result);
  }

  async getDetails(majorId: UUID): Promise<ResMajorDetailDto> {
    const queryBuider = this.majorRepository
      .createQueryBuilder('major')
      .where(`major.id = '${majorId}'`)
      .leftJoinAndSelect(`major.groupCourses`, 'groupCourses');
    const entity = await queryBuider.getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'Major not found',
      });
    }
    const dto = plainToClass(ResMajorDetailDto, entity);
    for (const groupCourse of dto.groupCourses) {
      dto.groupCourses.push(
        await this.groupCourseService.getGroupDetails(groupCourse.id),
      );
      dto.groupCourses.shift();
    }
    return dto;
  }
}
