import { ApiProperty } from '@nestjs/swagger';

export class ReqVerifyEmailDto {
  @ApiProperty()
  token: string;
}
