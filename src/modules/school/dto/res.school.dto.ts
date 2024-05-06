import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class ResSchoolDto {
  @ApiProperty()
  id: UUID;

  @ApiProperty()
  name: string;
}
