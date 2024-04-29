import { ApiProperty } from '@nestjs/swagger';

export class ResDeleteResultDto {
  @ApiProperty()
  raw: any;

  @ApiProperty()
  affected: number | null;
}
