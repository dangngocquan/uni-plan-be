import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { PlanStatus } from '../plan.enum';

export class ReqUpdatePlanDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ default: PlanStatus.COMPLETED })
  @IsString()
  @IsEnum(PlanStatus)
  status: PlanStatus;
}
