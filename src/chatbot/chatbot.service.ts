import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';

@Injectable()
export class ChatbotService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    projectId: number,
    createChatbotDto: CreateChatbotDto,
  ): Promise<Chatbot> {
    const chatbot = await this.prismaService.chatbot.create({
      data: {
        projectId,
        ...createChatbotDto,
      },
    });

    if (chatbot.enabled) {
      // TODO: validate
      // TODO: send schema to chatbot-container
    }

    return chatbot;
  }

  async findAll(projectId: number): Promise<Chatbot[]> {
    return this.prismaService.chatbot.findMany({
      where: {
        projectId,
      },
    });
  }

  async findOne(projectId: number, id: number): Promise<Chatbot> {
    const chatbot = await this.prismaService.chatbot.findUnique({
      where: {
        projectId_id: {
          projectId,
          id,
        },
      },
    });

    if (!chatbot) {
      throw new NotFoundException();
    }

    return chatbot;
  }

  async update(
    projectId: number,
    id: number,
    updateChatbotDto: UpdateChatbotDto,
  ): Promise<Chatbot> {
    const chatbot = await this.prismaService.chatbot
      .update({
        where: {
          projectId_id: {
            projectId,
            id,
          },
        },
        data: updateChatbotDto,
      })
      .catch(() => undefined);

    if (!chatbot) {
      throw new NotFoundException();
    }

    if (chatbot.enabled) {
      // TODO: validate
      // TODO: send schema to chatbot-container
    }

    return chatbot;
  }

  async delete(projectId: number, id: number): Promise<Chatbot> {
    const chatbot = await this.prismaService.chatbot
      .delete({
        where: {
          projectId_id: {
            projectId,
            id,
          },
        },
      })
      .catch(() => undefined);

    if (!chatbot) {
      throw new NotFoundException();
    }

    return chatbot;
  }
}
