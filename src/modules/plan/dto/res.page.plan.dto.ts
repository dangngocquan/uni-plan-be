import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../shared/dto/pagination/pagination.dto';
import { ResPlanDto } from './res.plan.dto';

export class PaginationPlanDto extends PaginationDto {
  @ApiProperty({
    isArray: true,
    type: ResPlanDto,
  })
  items: ResPlanDto[];

  constructor(items, meta, links) {
    super(meta, links);
    this.items = items;
  }
}
