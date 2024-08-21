import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PlanEntity } from './plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { PlanCoursePossible, PlanCourseStatus, PlanStatus } from './plan.enum';
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
import {
  CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE,
  LetterGrade,
} from '../grade-conversion/grade-conversion.enum';
import { GradeConversionTableEntity } from '../grade-conversion/entity/grade-conversion-table.entity';
import { GradeConversionService } from '../grade-conversion/grade-conversion.service';
import { ResGradeConversionTableDto } from '../grade-conversion/dto/res.conversion-table.dto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,

    @InjectRepository(GradeConversionTableEntity)
    private readonly gradeConversionTableRepository: Repository<GradeConversionTableEntity>,

    private readonly authService: AuthService,

    private readonly gradeConversionService: GradeConversionService,
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
    // List courses
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

    // Summary
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
    const gradeCreditsObject = {
      ['Not Completed']: 0,
    };
    Object.values(LetterGrade).forEach((g) => (gradesObject[g] = 0));
    Object.values(LetterGrade).forEach((g) => (gradeCreditsObject[g] = 0));
    entity.courses.forEach((c) => {
      summary.totalCourses++;
      summary.totalCredits += Number(c.baseCourse.credits);
      if (c.status === PlanCourseStatus.COMPLETED) {
        summary.numberCoursesCompleted++;
        summary.numberCreditsCompleted += Number(c.baseCourse.credits);
        summary.currentCPA +=
          Number(c.fourPointGrade) * Number(c.baseCourse.credits);
        gradesObject[c.letterGrade] += 1;
        gradeCreditsObject[c.letterGrade] += Number(c.baseCourse.credits);
      } else {
        gradesObject['Not Completed'] += 1;
        gradeCreditsObject['Not Completed'] += Number(c.baseCourse.credits);
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
        creditCount: gradeCreditsObject[key],
      };
    });

    // CPA
    const gradeTable =
      await this.gradeConversionService.getGradeConversionTable();
    const cpaStatus = {
      currentCPA: null,
      withImprovements: {
        minCPA: 0,
        minRoundCPA: 0,
        maxCPA: 4,
        maxRoundCPA: 4,
        calculatorCPA: [],
      },
      withoutImprovements: {
        minCPA: 0,
        minRoundCPA: 0,
        maxCPA: 4,
        maxRoundCPA: 4,
        calculatorCPA: [],
      },
    };
    cpaStatus.currentCPA =
      await this.gradeConversionService.getGradeCongraduationInfo(
        summary.currentCPA > 0 ? summary.currentCPA : 1,
      );

    // withoutImproments
    cpaStatus.withoutImprovements.minCPA =
      (summary.currentCPA * summary.numberCreditsCompleted +
        (summary.totalCredits - summary.numberCreditsCompleted) *
          CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.D]) /
      summary.totalCredits;
    cpaStatus.withoutImprovements.minRoundCPA = await this.roundGradeCongration(
      cpaStatus.withoutImprovements.minCPA,
    );
    cpaStatus.withoutImprovements.maxCPA =
      (summary.currentCPA * summary.numberCreditsCompleted +
        (summary.totalCredits - summary.numberCreditsCompleted) *
          CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.A_PLUS]) /
      summary.totalCredits;

    cpaStatus.withoutImprovements.maxRoundCPA = await this.roundGradeCongration(
      cpaStatus.withoutImprovements.maxCPA,
    );

    cpaStatus.withoutImprovements.calculatorCPA = (
      await this.gradeConversionService.getGradeCongraduationConversionTable()
    ).gradeConversions.map((grade) => {
      const data = {
        grade: null,
        status: null,
        fourPointGrade: grade.fourPointGrade,
        label: grade.labelTenPointGrade,
        details: {
          case1: [],
          case2: [],
        },
      };

      data.grade = grade.letterGrade;
      data.status =
        grade.fromTenPointGrade <= cpaStatus.withoutImprovements.minRoundCPA
          ? PlanCoursePossible.DONE
          : grade.fromTenPointGrade > cpaStatus.withoutImprovements.maxRoundCPA
            ? PlanCoursePossible.IS_NOT_POSSIBLE
            : PlanCoursePossible.IS_POSSIBLE;
      if (data.status === PlanCoursePossible.IS_POSSIBLE) {
        const completedCredits = summary.numberCreditsCompleted;
        const completedPoints =
          summary.currentCPA * summary.numberCreditsCompleted;
        const avg =
          (grade.fromTenPointGrade * summary.totalCredits - completedPoints) /
          (summary.totalCredits - completedCredits);
        data.details.case1 = this.getTwoGradeCongraduation(
          avg,
          gradeTable,
          summary.totalCredits - completedCredits,
          grade.fromTenPointGrade * summary.totalCredits - completedPoints,
        ).map((e) => {
          return { ...e, count: e['count'] };
        });
        data.details.case2 = this.getTwoGradeCongraduation2(
          avg,
          gradeTable,
          summary.totalCredits - completedCredits,
          grade.fromTenPointGrade * summary.totalCredits - completedPoints,
        ).map((e) => {
          return { ...e, count: e['count'] };
        });
      }

      return data;
    });

    // WithImproments
    cpaStatus.withImprovements.minCPA =
      (summary.currentCPA * summary.numberCreditsCompleted -
        gradeCreditsObject[LetterGrade.D] *
          CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.D] -
        gradeCreditsObject[LetterGrade.D_PLUS] *
          CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.D_PLUS] +
        (summary.totalCredits -
          summary.numberCreditsCompleted +
          gradeCreditsObject[LetterGrade.D] +
          gradeCreditsObject[LetterGrade.D_PLUS]) *
          CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.D]) /
      summary.totalCredits;
    cpaStatus.withImprovements.minRoundCPA = await this.roundGradeCongration(
      cpaStatus.withImprovements.minCPA,
    );
    cpaStatus.withImprovements.maxCPA =
      (summary.currentCPA * summary.numberCreditsCompleted -
        gradeCreditsObject[LetterGrade.D] *
          CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.D] -
        gradeCreditsObject[LetterGrade.D_PLUS] *
          CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.D_PLUS] +
        (summary.totalCredits -
          summary.numberCreditsCompleted +
          gradeCreditsObject[LetterGrade.D] +
          gradeCreditsObject[LetterGrade.D_PLUS]) *
          CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.A_PLUS]) /
      summary.totalCredits;
    cpaStatus.withImprovements.maxRoundCPA = await this.roundGradeCongration(
      cpaStatus.withImprovements.maxCPA,
    );
    cpaStatus.withImprovements.calculatorCPA = (
      await this.gradeConversionService.getGradeCongraduationConversionTable()
    ).gradeConversions.map((grade) => {
      const data = {
        grade: '',
        status: '',
        fourPointGrade: grade.fourPointGrade,
        label: grade.labelTenPointGrade,
        details: {
          case1: [],
          case2: [],
        },
      };

      data.grade = grade.letterGrade;
      data.status =
        grade.fromTenPointGrade <= cpaStatus.withImprovements.minRoundCPA
          ? PlanCoursePossible.DONE
          : grade.fromTenPointGrade > cpaStatus.withImprovements.maxRoundCPA
            ? PlanCoursePossible.IS_NOT_POSSIBLE
            : PlanCoursePossible.IS_POSSIBLE;
      if (data.status === PlanCoursePossible.IS_POSSIBLE) {
        const completedCredits =
          summary.numberCreditsCompleted -
          gradeCreditsObject[LetterGrade.D] -
          gradeCreditsObject[LetterGrade.D_PLUS];
        const completedPoints =
          summary.currentCPA * summary.numberCreditsCompleted -
          gradeCreditsObject[LetterGrade.D] *
            CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.D] -
          gradeCreditsObject[LetterGrade.D_PLUS] *
            CONVERT_LETTER_GRADE_TO_FOUR_POINT_GRADE[LetterGrade.D_PLUS];
        const avg =
          (grade.fromTenPointGrade * summary.totalCredits - completedPoints) /
          (summary.totalCredits - completedCredits);
        data.details.case1 = this.getTwoGradeCongraduation(
          avg,
          gradeTable,
          summary.totalCredits - completedCredits,
          grade.fromTenPointGrade * summary.totalCredits - completedPoints,
        ).map((e) => {
          return {
            ...e,
            count: e['count'],
          };
        });
        data.details.case2 = this.getTwoGradeCongraduation2(
          avg,
          gradeTable,
          summary.totalCredits - completedCredits,
          grade.fromTenPointGrade * summary.totalCredits - completedPoints,
        ).map((e) => {
          return { ...e, count: e['count'] };
        });
      }

      return {
        grade: data.grade,
        status: data.status,
        fourPointGrade: data.fourPointGrade,
        label: data.label,
        details: {
          case1: [...data.details.case1],
          case2: [...data.details.case2],
        },
      };
    });

    const result = {
      ...entity,
      summary: summary,
      cpaStatus: cpaStatus,
    };

    return plainToClass(ResPlanDetailDto, result);
  }

  async roundGrade(grade: number) {
    const info = await this.gradeConversionService.getGradeInfo(grade);
    if (!info) {
      return null;
    }
    return info.tenPointGrade;
  }

  async roundGradeCongration(grade: number) {
    const info = await this.gradeConversionService.getGradeCongraduationInfo(
      grade > 0 ? grade : 1,
    );
    if (!info) {
      return null;
    }
    return info.fourPointGrade;
  }

  getTwoGradeCongraduation(
    grade: number,
    table: ResGradeConversionTableDto,
    credits: number,
    totalPoint: number,
  ) {
    let res = [];
    for (let i = 1; i < table.gradeConversions.length; i++) {
      if (table.gradeConversions[i].fourPointGrade <= grade) {
        res = [table.gradeConversions[i], table.gradeConversions[i - 1]];
        break;
      }
    }
    if (res.length > 0) {
      const a = Math.floor(
        (totalPoint - credits * res[1].fourPointGrade) /
          (res[0].fourPointGrade - res[1].fourPointGrade),
      );
      res[0]['count'] = a;
      res[1]['count'] = credits - a;
    }
    return res;
  }

  getTwoGradeCongraduation2(
    grade: number,
    table: ResGradeConversionTableDto,
    credits: number,
    totalPoint: number,
  ) {
    const res = [
      table.gradeConversions[table.gradeConversions.length - 2],
      table.gradeConversions[0],
    ];
    if (res.length > 0) {
      const a = Math.floor(
        (totalPoint - credits * res[1].fourPointGrade) /
          (res[0].fourPointGrade - res[1].fourPointGrade),
      );
      res[0]['count'] = a;
      res[1]['count'] = credits - a;
    }
    return res;
  }
}
