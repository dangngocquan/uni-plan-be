import { ApiProperty } from '@nestjs/swagger';

export class ReqForgotPasswordDto {
  @ApiProperty()
  email: string;
}
