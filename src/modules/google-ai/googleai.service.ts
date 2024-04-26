import { GoogleGenerativeAI } from '@google/generative-ai';
import { config as dotenvConfig } from 'dotenv';
import { Injectable } from '@nestjs/common';
import { ReqGenerateTextDto } from './dto/req.generate-text.dto';

dotenvConfig({ path: '.env' });

@Injectable()
export class GoogleAIService {
  constructor(private readonly genAI) {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  }

  async generateText(dto: ReqGenerateTextDto): Promise<string> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = dto.content;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text;
  }
}
