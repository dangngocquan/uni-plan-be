import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqCreateGroupRelationDto {
  @ApiProperty()
  @IsUUID()
  groupId: UUID;

  @ApiProperty()
  @IsUUID()
  parentGroupId: UUID;
}
