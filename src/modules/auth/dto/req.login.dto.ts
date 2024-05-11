import { ApiProperty } from '@nestjs/swagger';

export class ReqLoginDto {
  @ApiProperty()
  email: string;

  @ApiProperty({
    nullable: false,
  })
  password: string;
}
