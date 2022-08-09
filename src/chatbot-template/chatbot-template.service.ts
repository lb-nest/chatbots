import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaPromise } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateChatbotTemplateDto } from './dto/create-chatbot-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-chatbot-template.dto';
import { ChatbotTemplate } from './entities/chatbot-template.entity';

@Injectable()
export class ChatbotTemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createChatbotTemplateDto: CreateChatbotTemplateDto,
  ): PrismaPromise<ChatbotTemplate> {
    throw new NotImplementedException();
  }

  findAll(): PrismaPromise<ChatbotTemplate[]> {
    return this.prismaService.chatbotTemplate.findMany({
      where: {},
    });
  }

  findOne(id: number): PrismaPromise<ChatbotTemplate> {
    return this.prismaService.chatbotTemplate.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  update(
    updateChatbotTemplateDto: UpdateChatbotTemplateDto,
  ): PrismaPromise<ChatbotTemplate> {
    throw new NotImplementedException();
  }

  remove(id: number): PrismaPromise<ChatbotTemplate> {
    throw new NotImplementedException();
  }
}
