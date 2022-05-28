import { Module } from '@nestjs/common';
import { ChatbotTemplateController } from './template.controller';
import { ChatbotTemplateService } from './template.service';

@Module({
  controllers: [ChatbotTemplateController],
  providers: [ChatbotTemplateService],
})
export class ChatbotTemplateModule {}
