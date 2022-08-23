import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';
import { ChatbotsCompiler } from 'src/shared/helpers/chatbots.compiler';
import { ChatbotsContainerProvider } from 'src/shared/services/chatbots-container.provider';
import { ChatbotsTokenProvider } from 'src/shared/services/chatbots-token.provider';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly compiler: ChatbotsCompiler,
    private readonly containerProvider: ChatbotsContainerProvider,
    private readonly tokenProvider: ChatbotsTokenProvider,
  ) {}

  async create(
    projectId: number,
    createChatbotDto: CreateChatbotDto,
  ): Promise<Chatbot> {
    const container = createChatbotDto.enabled
      ? this.containerProvider.get()
      : undefined;

    const chatbot = await this.prismaService.chatbot.create({
      data: {
        projectId,
        ...(createChatbotDto as any),
        container,
      },
    });

    if (chatbot.enabled) {
      const schema = this.compiler.compile(chatbot.flow as any);
      await axios.post(container.concat('/start'), schema, {
        headers: {
          token: this.tokenProvider.get(chatbot.id, projectId),
        },
      });
    }

    return chatbot;
  }

  async findAll(projectId: number): Promise<Chatbot[]> {
    return this.prismaService.chatbot.findMany({
      where: {
        projectId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async findOne(projectId: number, id: number): Promise<Chatbot> {
    return this.prismaService.chatbot.findUniqueOrThrow({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });
  }

  async update(
    projectId: number,
    updateChatbotDto: UpdateChatbotDto,
  ): Promise<Chatbot> {
    const container = updateChatbotDto.enabled
      ? this.containerProvider.get()
      : undefined;

    const chatbot = await this.prismaService.chatbot.update({
      where: {
        projectId_id: {
          projectId,
          id: updateChatbotDto.id,
        },
      },
      data: {
        ...(updateChatbotDto as any),
        container,
      },
    });

    if (typeof chatbot.enabled !== 'undefined') {
      if (chatbot.enabled) {
        const token = this.tokenProvider.get(chatbot.id, projectId);
        if (chatbot.enabled) {
          const schema = this.compiler.compile(chatbot.flow as any);
          await axios.post(container.concat('/start'), schema, {
            headers: {
              token,
            },
          });
        } else {
          await axios.post(
            chatbot.container.concat('/stop'),
            {},
            {
              headers: {
                token,
              },
            },
          );
        }
      }
    }

    return chatbot;
  }

  async remove(projectId: number, id: number): Promise<Chatbot> {
    const chatbot = await this.prismaService.chatbot.delete({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });

    if (chatbot.enabled) {
      const token = this.tokenProvider.get(chatbot.id, projectId);
      await axios.post(
        chatbot.container.concat('/stop'),
        {},
        {
          headers: {
            token,
          },
        },
      );
    }

    return chatbot;
  }
}
