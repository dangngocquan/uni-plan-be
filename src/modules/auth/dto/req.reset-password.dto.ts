import { ApiProperty } from '@nestjs/swagger';

export class ReqResetPasswordDto {
  @ApiProperty()
  newPassword: string;
}
