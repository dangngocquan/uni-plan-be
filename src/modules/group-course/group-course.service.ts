import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupCourseEntity } from './entity/group-course.entity';
import { Repository } from 'typeorm';
import { GroupCourseRelationEntity } from './entity/group-course-relation.entity';
import { PageOptionGroupCourseDto } from './dto/req.page-option.group-course.dto';
import { PaginationGroupCourseDto } from './dto/res.page.group-course.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { ReqCreateGroupCourseDto } from './dto/req.create-group-course.dto';
import { ResGroupCourseDto } from './dto/res.group-course.dto';
import { plainToClass } from 'class-transformer';
import { ReqUpdateGroupCourseDto } from './dto/req.update-group-course.dto';
import { UUID } from 'crypto';
import { ResDeleteResultDto } from '../../shared/dto/response/res.delete-result.dto';

@Injectable()
export class GroupCourseService {
  constructor(
    @InjectRepository(GroupCourseEntity)
    private readonly groupCourseRepository: Repository<GroupCourseEntity>,
    @InjectRepository(GroupCourseRelationEntity)
    private readonly groupCourseRelationRepository: Repository<GroupCourseRelationEntity>,
  ) {}

  async getGroups(
    dto: PageOptionGroupCourseDto,
  ): Promise<PaginationGroupCourseDto> {
    const queryBuider = this.groupCourseRepository
      .createQueryBuilder('groupCourse')
      .leftJoinAndSelect('groupCourse.major', 'major');
    if (dto.majorId) {
      queryBuider.where(`groupCourse.majorId = '${dto.majorId}'`);
    }
    if (dto.schoolId) {
      queryBuider.where(`major.schoolId = '${dto.schoolId}'`);
    }
    if (dto.type) {
      queryBuider.where(`groupCourse.type = '${dto.type}'`);
    }
    const { items, meta, links } = await paginate(queryBuider, {
      page: dto.page,
      limit: dto.limit,
      route: 'api/group-course',
    });
    return new PaginationGroupCourseDto(items, meta, links);
  }

  async create(dto: ReqCreateGroupCourseDto): Promise<ResGroupCourseDto> {
    let groupCourseEntity = this.groupCourseRepository.create({
      type: dto.type,
      minCredits: dto.minCredits,
      minCourses: dto.minCourses,
      minGroups: dto.minGroups,
      majorId: dto.majorId,
      title: dto.title,
      description: dto.description,
    });
    groupCourseEntity =
      await this.groupCourseRepository.save(groupCourseEntity);
    return plainToClass(ResGroupCourseDto, groupCourseEntity);
  }

  async update(
    groupId: UUID,
    dto: ReqUpdateGroupCourseDto,
  ): Promise<ResGroupCourseDto> {
    let groupCourseEntity = await this.groupCourseRepository
      .createQueryBuilder('groupCourse')
      .where(`groupCourse.id = '${groupId}'`)
      .getOne();
    if (!groupCourseEntity) {
      throw new NotFoundException({
        message: 'GroupCourse not found',
      });
    }
    groupCourseEntity.minCourses = dto.minCourses;
    groupCourseEntity.minCredits = dto.minCredits;
    groupCourseEntity.minGroups = dto.minGroups;
    groupCourseEntity.title = dto.title;
    groupCourseEntity.description = dto.description;
    groupCourseEntity =
      await this.groupCourseRepository.save(groupCourseEntity);
    return plainToClass(ResGroupCourseDto, groupCourseEntity);
  }

  async delete(groupId: UUID): Promise<ResDeleteResultDto> {
    const result = this.groupCourseRepository.delete(groupId);
    return plainToClass(ResDeleteResultDto, result);
  }
}
