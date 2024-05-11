import { ApiProperty } from '@nestjs/swagger';

export class ReqGoogleTokenDto {
  @ApiProperty()
  idToken: string;
}
