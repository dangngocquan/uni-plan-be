import { ApiProperty } from '@nestjs/swagger';

export class ReqUpdateMajorDto {
  @ApiProperty()
  name: string;
}
