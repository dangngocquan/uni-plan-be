import { Module } from '@nestjs/common';
import { OpenAIController } from './openai.controller';
import { OpenAIService } from './openai.service';
import OpenAI from 'openai';

@Module({
  imports: [],
  controllers: [OpenAIController],
  providers: [OpenAIService, OpenAI],
  exports: [OpenAIService, OpenAI],
})
export class OpenAIModule {}
