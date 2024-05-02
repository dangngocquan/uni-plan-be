import { ApiProperty } from '@nestjs/swagger';
import { UUID } from 'crypto';

export class ResMajorDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  schoolId: UUID;
}
