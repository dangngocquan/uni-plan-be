import { config as dotenvConfig } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ReqChatCompletionDto } from './dto/req.chat-completion.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

dotenvConfig({ path: '.env' });

@Injectable()
export class OpenAIService {
  constructor(private readonly httpService: HttpService) {}

  async chatCompletion(dto: ReqChatCompletionDto): Promise<any> {
    const url = `${process.env.CHATGPT_FREE_HOST}/chat/completions`;
    const data = {
      messages: [{ role: 'user', content: dto.content }],
      model: 'gpt-3.5-turbo',
    };
    const option = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CHATGPT_API_KEY_FREE}`,
      },
    };
    const observable = await this.httpService.post(url, data, option);
    const res = await firstValueFrom(observable);
    return res.data;
  }
}
