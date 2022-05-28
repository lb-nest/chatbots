import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateChatbotTemplateDto } from './dto/create-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-template.dto';
import { ChatbotTemplate } from './entities/template.entity';

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
    const chatbotTemplate = await this.prismaService.chatbotTemplate.findUnique(
      {
        where: {
          id,
        },
      },
    );

    if (!chatbotTemplate) {
      throw new NotFoundException();
    }

    return chatbotTemplate;
  }

  async update(
    id: number,
    updateChatbotTemplateDto: UpdateChatbotTemplateDto,
  ): Promise<ChatbotTemplate> {
    throw new NotImplementedException();
  }

  async delete(id: number): Promise<ChatbotTemplate> {
    throw new NotImplementedException();
  }
}
