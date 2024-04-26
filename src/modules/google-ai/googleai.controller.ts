import { Body, Controller, Post } from '@nestjs/common';
import { ReqGenerateTextDto } from './dto/req.generate-text.dto';
import { GoogleAIService } from './googleai.service';

@Controller('google-ai')
export class GoogleAIController {
  constructor(private readonly googleAIService: GoogleAIService) {}

  @Post('generate-text')
  async chatCompletion(@Body() dto: ReqGenerateTextDto): Promise<string> {
    return this.googleAIService.generateText(dto);
  }
}
