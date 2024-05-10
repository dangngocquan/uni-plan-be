import { ApiProperty } from '@nestjs/swagger';

export class ReqRefreshTokenDto {
  @ApiProperty()
  refreshToken: string;
}
