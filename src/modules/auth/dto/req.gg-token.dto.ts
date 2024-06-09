import { ApiProperty } from '@nestjs/swagger';

export class ReqGoogleTokenDto {
  @ApiProperty()
  googleAccessToken: string;
}
