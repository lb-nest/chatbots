import { Controller, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PlainToClassInterceptor } from 'src/shared/interceptors/plain-to-class.interceptor';
import { ChatbotTemplateService } from './chatbot-template.service';
import { CreateChatbotTemplateDto } from './dto/create-chatbot-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-chatbot-template.dto';
import { ChatbotTemplate } from './entities/chatbot-template.entity';

@Controller()
export class ChatbotTemplateController {
  constructor(
    private readonly chatbotTemplateService: ChatbotTemplateService,
  ) {}
  @MessagePattern('createChatbotTemplate')
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  create(
    @Payload() createChatbotTemplateDto: CreateChatbotTemplateDto,
  ): Promise<ChatbotTemplate> {
    return this.chatbotTemplateService.create(createChatbotTemplateDto);
  }

  @MessagePattern('findAllChatbotTemplates')
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  findAll() {
    return this.chatbotTemplateService.findAll();
  }

  @MessagePattern('findOneChatbotTemplate')
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  findOne(@Payload('id', ParseIntPipe) id: number): Promise<ChatbotTemplate> {
    return this.chatbotTemplateService.findOne(id);
  }

  @MessagePattern('updateChatbotTemplate')
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  update(
    @Payload() updateChatbotTemplateDto: UpdateChatbotTemplateDto,
  ): Promise<ChatbotTemplate> {
    return this.chatbotTemplateService.update(updateChatbotTemplateDto);
  }

  @MessagePattern('removeChatbotTemplate')
  @UseInterceptors(new PlainToClassInterceptor(ChatbotTemplate))
  remove(@Payload('id', ParseIntPipe) id: number): Promise<ChatbotTemplate> {
    return this.chatbotTemplateService.remove(id);
  }
}
