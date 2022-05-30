import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatbotTemplateController } from './template.controller';
import { ChatbotTemplateService } from './template.service';

@Module({
  controllers: [ChatbotTemplateController],
  providers: [PrismaService, ChatbotTemplateService],
})
export class ChatbotTemplateModule {}
