import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatbotTemplateController } from './chatbot-template.controller';
import { ChatbotTemplateService } from './chatbot-template.service';

@Module({
  controllers: [ChatbotTemplateController],
  providers: [PrismaService, ChatbotTemplateService],
})
export class ChatbotTemplateModule {}
