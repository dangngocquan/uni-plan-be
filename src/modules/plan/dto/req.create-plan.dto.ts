import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqCreatePlanDto {
  @ApiProperty()
  @IsString()
  name: string;
}
