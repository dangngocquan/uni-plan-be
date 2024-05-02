import { ApiProperty } from '@nestjs/swagger';

export class ResSchoolDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
