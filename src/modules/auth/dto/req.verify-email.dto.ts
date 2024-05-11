import { ApiProperty } from '@nestjs/swagger';

export class ReqVerifyEmailDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  otp: string;
}
