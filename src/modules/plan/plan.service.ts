import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PlanEntity } from './plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { PlanCourseStatus, PlanStatus } from './plan.enum';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationPlanDto } from './dto/res.page.plan.dto';
import { PaginationOptionsDto } from '../../shared/dto/pagination/pagination.option.dto';
import { ReqCreatePlanDto } from './dto/req.create-plan.dto';
import { ResPlanDto } from './dto/res.plan.dto';
import { plainToClass } from 'class-transformer';
import { ReqUpdatePlanDto } from './dto/req.update-plan.dto';
import { UUID } from 'crypto';
import { ResPlanDetailDto } from './dto/res.plan-detail.dto';
import { AuthService } from '../auth/auth.service';
import { LetterGrade } from '../grade-conversion/grade-conversion.enum';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,

    private readonly authService: AuthService,
  ) {}

  async findAll(
    user: UserEntity,
    dto: PaginationOptionsDto,
  ): Promise<PaginationPlanDto> {
    const queryBuider = this.planRepository
      .createQueryBuilder('plan')
      .where(`plan.ownerId = '${user.id}'`)
      .andWhere(`LOWER(plan.name) LIKE '%${dto.q.toLowerCase().trim()}%'`)
      .andWhere(`plan.status = '${PlanStatus.COMPLETED}'`);

    const { items, meta, links } = await paginate(queryBuider, {
      page: dto.page,
      limit: dto.limit,
      route: 'api/plan',
    });
    return new PaginationPlanDto(items, meta, links);
  }

  async create(user: UserEntity, dto: ReqCreatePlanDto): Promise<ResPlanDto> {
    let entity = this.planRepository.create({
      ownerId: user.id,
      name: dto.name,
    });
    entity = await this.planRepository.save(entity);
    return plainToClass(ResPlanDto, entity);
  }

  async update(
    user: UserEntity,
    dto: ReqUpdatePlanDto,
    id: UUID,
  ): Promise<ResPlanDto> {
    if (!(await this.authService.isOwnerPlan(user, id))) {
      throw new UnauthorizedException({
        message: 'Unauthorized: You are not owner of this plan',
      });
    }
    let entity = await this.planRepository
      .createQueryBuilder('plan')
      .where(`plan.ownerId = '${user.id}'`)
      .andWhere(`plan.id = '${id}'`)
      .getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'Plan not found',
      });
    }
    entity.name = dto.name;
    entity.status = dto.status;
    entity = await this.planRepository.save(entity);
    return plainToClass(ResPlanDto, entity);
  }

  async delete(user: UserEntity, id: UUID): Promise<ResPlanDto> {
    if (!(await this.authService.isOwnerPlan(user, id))) {
      throw new UnauthorizedException({
        message: 'Unauthorized: You are not owner of this plan',
      });
    }
    const entity = await this.planRepository
      .createQueryBuilder('plan')
      .where(`plan.ownerId = '${user.id}'`)
      .andWhere(`plan.id = '${id}'`)
      .getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'Plan not found',
      });
    }
    await this.planRepository.delete(id);
    return plainToClass(ResPlanDto, entity);
  }

  async getPlanDetails(user: UserEntity, id: UUID) {
    if (!(await this.authService.isOwnerPlan(user, id))) {
      throw new UnauthorizedException({
        message: 'Unauthorized: You are not owner of this plan',
      });
    }
    const entity = await this.planRepository
      .createQueryBuilder('plan')
      .where(`plan.id = '${id}'`)
      .leftJoinAndSelect('plan.courses', 'courses')
      .leftJoinAndSelect('courses.baseCourse', 'baseCourse')
      .leftJoinAndSelect(
        'baseCourse.prereqCourseRelations',
        'prereqCourseRelations',
      )
      .orderBy({
        'baseCourse.orderIndex': 'ASC',
      })
      .getOne();
    if (!entity) {
      throw new NotFoundException({
        message: 'Plan not found',
      });
    }

    const summary = {
      totalCourses: 0,
      totalCredits: 0,
      numberCoursesCompleted: 0,
      numberCreditsCompleted: 0,
      currentCPA: 0,
      grades: [],
    };
    const gradesObject = {
      ['Not Completed']: 0,
    };
    Object.values(LetterGrade).forEach((g) => (gradesObject[g] = 0));
    entity.courses.forEach((c) => {
      summary.totalCourses++;
      summary.totalCredits += Number(c.baseCourse.credits);
      if (c.status === PlanCourseStatus.COMPLETED) {
        summary.numberCoursesCompleted++;
        summary.numberCreditsCompleted += Number(c.baseCourse.credits);
        summary.currentCPA +=
          Number(c.fourPointGrade) * Number(c.baseCourse.credits);
        gradesObject[c.letterGrade] += 1;
      } else {
        gradesObject['Not Completed'] += 1;
      }
    });
    summary.currentCPA =
      summary.numberCreditsCompleted > 0
        ? summary.currentCPA / summary.numberCreditsCompleted
        : 0;
    summary.grades = Object.keys(gradesObject).map((key, index) => {
      return {
        no: index + 1,
        grade: key,
        count: gradesObject[key],
      };
    });

    const result = {
      ...entity,
      summary: summary,
    };

    return plainToClass(ResPlanDetailDto, result);
  }
}
