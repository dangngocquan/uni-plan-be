import { ApiProperty } from '@nestjs/swagger';

export class ReqChatCompletionDto {
  @ApiProperty()
  content: string;
}
