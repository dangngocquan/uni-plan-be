import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanEntity } from './plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { PlanStatus } from './plan.enum';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationPlanDto } from './dto/res.page.plan.dto';
import { PaginationOptionsDto } from '../../shared/dto/pagination/pagination.option.dto';
import { ReqCreatePlanDto } from './dto/req.create-plan.dto';
import { ResPlanDto } from './dto/res.plan.dto';
import { plainToClass } from 'class-transformer';
import { ReqUpdatePlanDto } from './dto/req.update-plan.dto';
import { UUID } from 'crypto';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
  ) {}

  async findAll(
    user: UserEntity,
    dto: PaginationOptionsDto,
  ): Promise<PaginationPlanDto> {
    const queryBuider = this.planRepository
      .createQueryBuilder('plan')
      .where(`plan.ownerId = '${user.id}'`)
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
}
