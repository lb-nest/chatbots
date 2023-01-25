import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChatbotTemplateDto } from './dto/create-chatbot-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-chatbot-template.dto';
import { ChatbotTemplate } from './entities/chatbot-template.entity';

@Injectable()
export class ChatbotTemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createChatbotTemplateDto: CreateChatbotTemplateDto,
  ): Promise<ChatbotTemplate> {
    throw new NotImplementedException();
  }

  async findAll(): Promise<ChatbotTemplate[]> {
    return this.prismaService.chatbotTemplate.findMany({
      where: {},
    });
  }

  async findOne(id: number): Promise<ChatbotTemplate> {
    return this.prismaService.chatbotTemplate.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(
    updateChatbotTemplateDto: UpdateChatbotTemplateDto,
  ): Promise<ChatbotTemplate> {
    throw new NotImplementedException();
  }

  async remove(id: number): Promise<ChatbotTemplate> {
    throw new NotImplementedException();
  }
}
