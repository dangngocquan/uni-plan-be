import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../users/role.enum';

export class ResGetMeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;

  @ApiProperty()
  avatar: string;
}
