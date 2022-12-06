import { Injectable } from '@nestjs/common';
import merge from 'lodash.merge';
import { ChatbotCompilerService } from 'src/chatbot/chatbot-compiler.service';
import { PrismaService } from 'src/prisma.service';
import { ChatbotContainerProvider } from './chatbot-container.provider';
import { ChatbotTokenProvider } from './chatbot-token.provider';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';

@Injectable()
export class ChatbotService {
  constructor(
    private readonly compilerService: ChatbotCompilerService,
    private readonly containerProvider: ChatbotContainerProvider,
    private readonly tokenProvider: ChatbotTokenProvider,
    private readonly prismaService: PrismaService,
  ) {}

  async create(
    projectId: number,
    createChatbotDto: CreateChatbotDto,
  ): Promise<Chatbot> {
    const container = createChatbotDto.enabled
      ? this.containerProvider.get()
      : undefined;

    const chatbot = await this.prismaService.chatbot.create({
      data: merge({}, createChatbotDto as any, {
        projectId,
        containerId: container.handshake.auth.containerId,
      }),
    });

    if (chatbot.enabled) {
      container.emit(
        'start',
        await this.compilerService.compile(chatbot.flow as any),
        {
          token: this.tokenProvider.get(chatbot.id, projectId),
        },
      );
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
    const chatbot = await this.prismaService.chatbot.update({
      where: {
        projectId_id: {
          projectId,
          id: updateChatbotDto.id,
        },
      },
      data: updateChatbotDto as any,
    });

    if (typeof updateChatbotDto.enabled === 'boolean') {
      const container = this.containerProvider.get(chatbot.containerId);
      const token = this.tokenProvider.get(chatbot.id, projectId);

      if (chatbot.enabled) {
        container.emit(
          'start',
          await this.compilerService.compile(chatbot.flow as any),
          {
            token,
          },
        );

        return this.prismaService.chatbot.update({
          where: {
            projectId_id: {
              projectId,
              id: updateChatbotDto.id,
            },
          },
          data: {
            containerId: container.handshake.auth.containerId,
          },
        });
      } else {
        container?.emit('stop', null, {
          token,
        });

        return this.prismaService.chatbot.update({
          where: {
            projectId_id: {
              projectId,
              id: updateChatbotDto.id,
            },
          },
          data: {
            containerId: null,
          },
        });
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
      const container = this.containerProvider.get(chatbot.containerId);
      container?.emit('stop', null, {
        token: this.tokenProvider.get(chatbot.id, projectId),
      });
    }

    return chatbot;
  }
}
