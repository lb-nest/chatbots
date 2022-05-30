import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from 'src/prisma.service';
import { ChatbotsCompiler } from 'src/shared/helpers/chatbots.compiler';
import { ChatbotsContainerProvider } from 'src/shared/services/chatbots-container.provider';
import { ChatbotsTokenProvider } from 'src/shared/services/chatbots-token.provider';
import { ChatbotController } from './chatbot.controller';
import { ChatbotService } from './chatbot.service';

@Module({
  imports: [ConfigModule],
  controllers: [ChatbotController],
  providers: [
    ChatbotService,
    PrismaService,
    ChatbotsCompiler,
    ChatbotsContainerProvider,
    ChatbotsTokenProvider,
  ],
})
export class ChatbotModule {}
