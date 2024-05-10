import { ApiProperty } from '@nestjs/swagger';

export class ReqResetPasswordDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  otp: string;

  @ApiProperty()
  newPassword: string;
}
