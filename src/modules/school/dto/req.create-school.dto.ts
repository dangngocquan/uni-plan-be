import { ApiProperty } from '@nestjs/swagger';

export class ReqCreateSchoolDto {
  @ApiProperty()
  name: string;
}
