import { ApiProperty } from '@nestjs/swagger';

export class ResPlanDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  createdAt: Date;
}
