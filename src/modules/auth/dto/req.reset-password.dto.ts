import { ApiProperty } from '@nestjs/swagger';

export class ReqResetPasswordDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  newPassword: string;
}
