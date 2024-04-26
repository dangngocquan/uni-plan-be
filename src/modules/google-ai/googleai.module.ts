import { Module } from '@nestjs/common';
import { GoogleAIController } from './googleai.controller';
import { GoogleAIService } from './googleai.service';

@Module({
  imports: [],
  controllers: [GoogleAIController],
  providers: [GoogleAIService, Object],
  exports: [GoogleAIService, Object],
})
export class GoogleAIModule {}
