import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlanCourseEntity } from './plan-course.entity';
import { ResPlanCourseDto } from './dto/res.plan-course.dto';
import { UserEntity } from '../users/user.entity';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationPlanCourseDto } from './dto/res.page.plan-course.dto';
import { UUID } from 'crypto';
import { ReqCreatePlanCourseDto } from './dto/req.create-plan-course.dto';
import { CourseEntity } from '../course/entity/course.entity';
import { ReqUpdatePlanCourseDto } from './dto/req.update-plan-course.dto';
import {
  CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE,
  FourPointGrade,
} from '../grade-conversion/grade-conversion.enum';
import { plainToClass } from 'class-transformer';
import { PageOptionPlanCourseDto } from './dto/req.page-option.major.dto';
import { ResCreatePlanCourseDto } from './dto/res.create-plan-course.dto';
import { Repository } from 'typeorm';
import { PlanCourseStatus } from '../plan/plan.enum';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PlanCourseService {
  constructor(
    @InjectRepository(PlanCourseEntity)
    private readonly planCourseRepository: Repository<PlanCourseEntity>,

    @InjectRepository(CourseEntity)
    private readonly courseRepository: Repository<CourseEntity>,

    private readonly authService: AuthService,
  ) {}

  async findAll(
    user: UserEntity,
    dto: PageOptionPlanCourseDto,
  ): Promise<PaginationPlanCourseDto> {
    if (!(await this.authService.isOwnerPlanCourse(user, dto.planId))) {
      throw new UnauthorizedException({
        message: 'Unauthorized: You are not owner of this plan',
      });
    }
    const queryBuider = this.planCourseRepository
      .createQueryBuilder('planCourse')
      .where(`planCourse.planId = '${dto.planId}'`);

    const { items, meta, links } = await paginate(queryBuider, {
      page: dto.page,
      limit: dto.limit,
      route: 'api/plan',
    });
    return new PaginationPlanCourseDto(items, meta, links);
  }

  async create(
    user: UserEntity,
    planId: UUID,
    dto: ReqCreatePlanCourseDto,
  ): Promise<ResCreatePlanCourseDto> {
    const data = dto.baseCourseIds.map((id) => {
      return {
        planId,
        baseCourseId: id,
      };
    });
    await this.planCourseRepository.insert(data);
    return plainToClass(ResPlanCourseDto, { planId: planId });
  }

  async update(
    user: UserEntity,
    planCourseId: UUID,
    dto: ReqUpdatePlanCourseDto,
  ): Promise<ResPlanCourseDto> {
    if (!(await this.authService.isOwnerPlanCourse(user, planCourseId))) {
      throw new UnauthorizedException({
        message: 'Unauthorized: You are not owner of this plan course',
      });
    }
    let entity = await this.planCourseRepository
      .createQueryBuilder('planCourse')
      .where(`planCourse.id = '${planCourseId}'`)
      .getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'Plan Course not found',
      });
    }
    if (dto.letterGrade) {
      entity.letterGrade = dto.letterGrade;
      entity.fourPointGrade = CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[
        dto.letterGrade
      ] as FourPointGrade;
      if (entity.fourPointGrade !== FourPointGrade.F) {
        entity.status = PlanCourseStatus.COMPLETED;
      }
    } else {
      entity.letterGrade = null;
      entity.fourPointGrade = null;
      entity.status = entity.status = PlanCourseStatus.NOT_COMPLETED;
    }

    entity = await this.planCourseRepository.save(entity);
    return plainToClass(ResPlanCourseDto, entity);
  }

  async delete(
    user: UserEntity,
    planCourseId: UUID,
  ): Promise<ResPlanCourseDto> {
    if (!(await this.authService.isOwnerPlanCourse(user, planCourseId))) {
      throw new UnauthorizedException({
        message: 'Unauthorized: You are not owner of this plan course',
      });
    }
    const entity = await this.planCourseRepository
      .createQueryBuilder('planCourse')
      .where(`planCourse.id = '${planCourseId}'`)
      .getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'Plan Course not found',
      });
    }
    await this.planCourseRepository.delete(planCourseId);
    return plainToClass(ResPlanCourseDto, entity);
  }
}
