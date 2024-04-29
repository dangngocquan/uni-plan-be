import { ApiProperty } from '@nestjs/swagger';

export class PaginationLinkDto {
  @ApiProperty()
  first: string;

  @ApiProperty()
  previous: string;

  @ApiProperty()
  next: string;

  @ApiProperty()
  last: string;
}
