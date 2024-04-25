import OpenAI from 'openai';
import { config as dotenvConfig } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ReqChatCompletionDto } from './dto/req.chat-completion.dto';

dotenvConfig({ path: '.env' });

@Injectable()
export class OpenAIService {
  constructor(private readonly openai: OpenAI) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async chatCompletion(
    dto: ReqChatCompletionDto,
  ): Promise<OpenAI.Chat.Completions.ChatCompletion> {
    return await this.openai.chat.completions.create({
      messages: [{ role: 'user', content: dto.content }],
      model: 'gpt-3.5-turbo',
    });
  }
}
