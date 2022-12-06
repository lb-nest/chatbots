import { Module } from '@nestjs/common';
import { ChatbotCompilerService } from 'src/chatbot/chatbot-compiler.service';
import { PrismaService } from 'src/prisma.service';
import { ChatbotContainerGateway } from './chatbot-container.gateway';
import { ChatbotContainerProvider } from './chatbot-container.provider';
import { ChatbotTokenProvider } from './chatbot-token.provider';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
  controllers: [ChatbotController],
  providers: [
    ChatbotCompilerService,
    ChatbotContainerGateway,
    ChatbotContainerProvider,
    ChatbotTokenProvider,
    ChatbotService,
    PrismaService,
  ],
})
export class ChatbotModule {}
