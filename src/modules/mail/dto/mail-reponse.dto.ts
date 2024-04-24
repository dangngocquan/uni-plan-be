import { ApiProperty } from '@nestjs/swagger';

export class ResMailDto {
  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }
}
