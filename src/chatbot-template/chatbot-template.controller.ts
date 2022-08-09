import {
  Body,
  Controller,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaPromise } from '@prisma/client';
import { BearerAuthGuard } from 'src/auth/bearer-auth.guard';
import { PlainToClassInterceptor } from 'src/shared/interceptors/plain-to-class.interceptor';
import { ChatbotTemplateService } from './chatbot-template.service';
import { CreateChatbotTemplateDto } from './dto/create-chatbot-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-chatbot-template.dto';
import { ChatbotTemplate } from './entities/chatbot-template.entity';

@Controller('chatbot-template')
export class ChatbotTemplateController {
  constructor(
    private readonly chatbotTemplateService: ChatbotTemplateService,
  ) {}

  @MessagePattern('chatbot-templates.create')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  create(
    @Body() createChatbotTemplateDto: CreateChatbotTemplateDto,
  ): PrismaPromise<ChatbotTemplate> {
    return this.chatbotTemplateService.create(createChatbotTemplateDto);
  }

  @MessagePattern('chatbot-templates.findAll')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  findAll(): PrismaPromise<ChatbotTemplate[]> {
    return this.chatbotTemplateService.findAll();
  }

  @MessagePattern('chatbot-templates.findOne')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  findOne(
    @Payload('payload', ParseIntPipe) id: number,
  ): PrismaPromise<ChatbotTemplate> {
    return this.chatbotTemplateService.findOne(id);
  }

  @MessagePattern('chatbot-templates.update')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  update(
    @Payload('payload') updateChatbotTemplateDto: UpdateChatbotTemplateDto,
  ): PrismaPromise<ChatbotTemplate> {
    return this.chatbotTemplateService.update(updateChatbotTemplateDto);
  }

  @MessagePattern('chatbot-templates.remove')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  remove(
    @Payload('payload', ParseIntPipe) id: number,
  ): PrismaPromise<ChatbotTemplate> {
    return this.chatbotTemplateService.remove(id);
  }
}
