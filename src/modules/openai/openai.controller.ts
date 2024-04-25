import { Body, Controller, Post } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import OpenAI from 'openai';
import { ReqChatCompletionDto } from './dto/req.chat-completion.dto';

@Controller('openai')
export class OpenAIController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post('chat-completion')
  async chatCompletion(
    @Body() dto: ReqChatCompletionDto,
  ): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    return this.openAIService.chatCompletion(dto);
  }
}
