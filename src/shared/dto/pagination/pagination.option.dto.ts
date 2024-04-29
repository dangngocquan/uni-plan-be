import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { OrderType } from './order.enum';
import { IsNumber, IsString } from 'class-validator';

export class PaginationOptionsDto {
  @ApiPropertyOptional({
    nullable: true,
    enum: OrderType,
    // default: OrderType.DESC,
  })
  @IsString()
  readonly order: OrderType = OrderType.DESC;

  @ApiPropertyOptional({
    nullable: true,
    // default: 1,
  })
  @Transform(({ value }) => value || 1)
  @IsNumber()
  readonly page: number = 1;

  @ApiPropertyOptional({
    nullable: true,
    // default: 10,
  })
  @Transform(({ value }) => value || 10)
  @IsNumber()
  readonly limit: number = 10;

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  @ApiPropertyOptional({
    nullable: true,
  })
  readonly q?: string;
}