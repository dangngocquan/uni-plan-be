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
import { ResGroupRelationDto } from './dto/res.group-relation.dto';
import { ReqCreateGroupRelationDto } from './dto/req.create-group-relation.dto';
import { ResGroupCourseDetailDto } from './dto/res.group-course-detail.dto';

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
    queryBuider.orderBy({
      'groupCourse.orderIndex': 'ASC',
    });
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
      level: dto.level,
    });
    groupCourseEntity =
      await this.groupCourseRepository.save(groupCourseEntity);
    if (dto.parentGroupId) {
      const parentGroupEntity = await this.groupCourseRepository
        .createQueryBuilder('groupCourse')
        .where(`groupCourse.id = '${dto.parentGroupId}'`)
        .getOne();
      if (!parentGroupEntity) {
        throw new NotFoundException({
          message: 'Parent Group Course not found',
        });
      }
      const relationEntity = this.groupCourseRelationRepository.create({
        groupId: groupCourseEntity.id,
        parentGroupId: parentGroupEntity.id,
      });
      await this.groupCourseRelationRepository.save(relationEntity);
    }
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

  async getGroupDetails(groupId: UUID): Promise<ResGroupCourseDetailDto> {
    const queryBuider = this.groupCourseRepository
      .createQueryBuilder('groupCourse')
      .where(`groupCourse.id = '${groupId}'`)
      .leftJoinAndSelect(`groupCourse.relationChildren`, 'relationChildren')
      .leftJoinAndSelect(`groupCourse.courses`, 'courses')
      .leftJoinAndSelect(
        'courses.prereqCourseRelations',
        'prereqCourseRelations',
      );
    const entity = await queryBuider.getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'Group course not found',
      });
    }
    const dto = plainToClass(ResGroupCourseDetailDto, entity);
    dto.children = [];
    for (const relationChild of entity.relationChildren) {
      dto.children.push(await this.getGroupDetails(relationChild.groupId));
    }

    return dto;
  }

  async addRelation(
    dto: ReqCreateGroupRelationDto,
  ): Promise<ResGroupRelationDto> {
    const queryBuilder = this.groupCourseRepository.createQueryBuilder('group');
    const childGroupEntity = await queryBuilder
      .where(`group.id = '${dto.groupId}'`)
      .getOne();
    if (!childGroupEntity) {
      throw new NotFoundException({
        message: 'Group course not found',
      });
    }
    const parentGroupEntity = await queryBuilder
      .where(`group.id = '${dto.parentGroupId}'`)
      .getOne();
    if (!parentGroupEntity) {
      throw new NotFoundException({
        message: 'Parent group course not found',
      });
    }
    let relationEntity = await this.groupCourseRelationRepository.create({
      groupId: dto.groupId,
      parentGroupId: dto.parentGroupId,
    });
    relationEntity =
      await this.groupCourseRelationRepository.save(relationEntity);
    relationEntity.childGroup = childGroupEntity;
    relationEntity.parentGroup = parentGroupEntity;
    return plainToClass(ResGroupRelationDto, relationEntity);
  }
}
