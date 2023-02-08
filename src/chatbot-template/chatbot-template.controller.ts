import { Controller, ParseIntPipe } from '@nestjs/common';
import { SerializeOptions } from '@nestjs/common/serializer';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatbotTemplateService } from './chatbot-template.service';
import { CreateChatbotTemplateDto } from './dto/create-chatbot-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-chatbot-template.dto';
import { ChatbotTemplate } from './entities/chatbot-template.entity';

@SerializeOptions({
  type: ChatbotTemplate,
})
@Controller()
export class ChatbotTemplateController {
  constructor(
    private readonly chatbotTemplateService: ChatbotTemplateService,
  ) {}

  @MessagePattern('createChatbotTemplate')
  create(
    @Payload() createChatbotTemplateDto: CreateChatbotTemplateDto,
  ): Promise<ChatbotTemplate> {
    return this.chatbotTemplateService.create(createChatbotTemplateDto);
  }

  @MessagePattern('findAllChatbotTemplates')
  findAll() {
    return this.chatbotTemplateService.findAll();
  }

  @MessagePattern('findOneChatbotTemplate')
  findOne(@Payload('id', ParseIntPipe) id: number): Promise<ChatbotTemplate> {
    return this.chatbotTemplateService.findOne(id);
  }

  @MessagePattern('updateChatbotTemplate')
  update(
    @Payload() updateChatbotTemplateDto: UpdateChatbotTemplateDto,
  ): Promise<ChatbotTemplate> {
    return this.chatbotTemplateService.update(updateChatbotTemplateDto);
  }

  @MessagePattern('removeChatbotTemplate')
  remove(@Payload('id', ParseIntPipe) id: number): Promise<ChatbotTemplate> {
    return this.chatbotTemplateService.remove(id);
  }
}
