import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class ReqCreateCourseDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  credits: number;

  @ApiProperty()
  @IsUUID()
  groupId: UUID;
}
