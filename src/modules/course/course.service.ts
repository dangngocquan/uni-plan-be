import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseEntity } from './entity/course.entity';
import { Repository } from 'typeorm';
import { CourseRelationEntity } from './entity/course-relation.entity';
import { PageOptionCourseDto } from './dto/req.page-option.course.dto';
import { PaginationCourseDto } from './dto/res.page.course.dto';
import { paginate } from 'nestjs-typeorm-paginate';
import { ReqCreateCourseDto } from './dto/req.create-course.dto';
import { ResCourseDto } from './dto/res.course.dto';
import { GroupCourseEntity } from '../group-course/entity/group-course.entity';
import { plainToClass } from 'class-transformer';
import { ReqUpdateCourseDto } from './dto/req.update-course.dto';
import { UUID } from 'crypto';
import { ResDeleteResultDto } from '../../shared/dto/response/res.delete-result.dto';
import { ReqCreateCourseRelationDto } from './dto/req.create-course-relation.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,
    @InjectRepository(CourseRelationEntity)
    private readonly courseRelationRepository: Repository<CourseRelationEntity>,
    @InjectRepository(GroupCourseEntity)
    private readonly groupCourseRepository: Repository<GroupCourseEntity>,
  ) {}

  async get(dto: PageOptionCourseDto): Promise<PaginationCourseDto> {
    const queryBuider = this.courseRepository
      .createQueryBuilder('course')
      .where(`course.id NOT NULL`);
    if (dto.id.length > 0) {
      const ids = dto.id.map((id) => `course.id = '${id}'`);
      queryBuider.andWhere(ids.join(' OR '));
    }
    if (dto.code.length > 0) {
      const codes = dto.code.map(
        (code) => `LOWER(course.code) LIKE '%${code.toLowerCase().trim()}%'`,
      );
      queryBuider.andWhere(codes.join(' OR '));
    }
    if (dto.name.length > 0) {
      queryBuider.where(`LOWER(course.name) LIKE '%${dto.name}%'`);
    }
    if (dto.credits.length > 0) {
      queryBuider.where(`course.credits = '${dto.credits}'`);
    }
    if (dto.groupId.length > 0) {
      queryBuider.where(`course.groupId = '${dto.groupId}'`);
    }
    const { items, meta, links } = await paginate(queryBuider, {
      page: dto.page,
      limit: dto.limit,
      route: 'api/course',
    });
    return new PaginationCourseDto(items, meta, links);
  }

  async create(dto: ReqCreateCourseDto): Promise<ResCourseDto> {
    const groupEntity = await this.groupCourseRepository
      .createQueryBuilder('groupCourse')
      .where(`groupCourse.id = '${dto.groupId}'`)
      .getOne();
    if (!groupEntity) {
      throw new NotFoundException({
        message: 'GroupCourse not found',
      });
    }
    let courseEntity = this.courseRepository.create({
      code: dto.code,
      name: dto.name,
      credits: dto.credits,
      groupId: dto.groupId,
    });
    courseEntity = await this.courseRepository.save(courseEntity);
    return plainToClass(ResCourseDto, courseEntity);
  }

  async update(courseId: UUID, dto: ReqUpdateCourseDto): Promise<ResCourseDto> {
    let courseEntity = await this.courseRepository
      .createQueryBuilder('course')
      .where(`course.id = '${courseId}'`)
      .getOne();
    if (!courseEntity) {
      throw new NotFoundException({
        message: 'Course not found',
      });
    }
    courseEntity.code = dto.code;
    courseEntity.name = dto.name;
    courseEntity.credits = dto.credits;
    courseEntity = await this.courseRepository.save(courseEntity);
    return plainToClass(ResCourseDto, courseEntity);
  }

  async delete(courseId: UUID): Promise<ResDeleteResultDto> {
    const result = await this.courseRepository.delete(courseId);
    return plainToClass(ResDeleteResultDto, result);
  }

  async addPrereqCourseCode(
    courseId: UUID,
    dto: ReqCreateCourseRelationDto,
  ): Promise<ResCourseDto> {
    const queryBuider = this.courseRepository
      .createQueryBuilder('course')
      .where(`course.id = '${courseId}'`);
    let courseEntity = await queryBuider.getOne();
    if (!courseEntity) {
      throw new NotFoundException({
        message: 'Course not found',
      });
    }
    const relationEntity = this.courseRelationRepository.create({
      courseId: courseId,
      prereqCourseCode: dto.prereqCourseCode,
    });
    await this.courseRelationRepository.save(relationEntity);
    courseEntity = await queryBuider
      .leftJoinAndSelect('course.prereqCourseCodes', 'prereqCourseCodes')
      .getOne();
    return plainToClass(ResCourseDto, courseEntity);
  }
}
