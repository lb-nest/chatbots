import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ChatbotCompilerService } from 'src/chatbot/chatbot-compiler.service';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';
import { ChatbotContainerProvider } from './chatbot-container.provider';
import { ChatbotTokenProvider } from './chatbot-token.provider';

@Module({
  controllers: [ChatbotController],
  providers: [
    ChatbotCompilerService,
    ChatbotContainerProvider,
    ChatbotTokenProvider,
    ChatbotService,
    PrismaService,
  ],
})
export class ChatbotModule {}
