import { Controller, ParseIntPipe, UseInterceptors } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PlainToClassInterceptor } from 'src/shared/interceptors/plain-to-class.interceptor';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';

@Controller()
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @MessagePattern('createChatbot')
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  create(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload() createChatbotDto: CreateChatbotDto,
  ) {
    return this.chatbotService.create(projectId, createChatbotDto);
  }

  @MessagePattern('findAllChatbots')
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  findAll(@Payload('projectId', ParseIntPipe) projectId: number) {
    return this.chatbotService.findAll(projectId);
  }

  @MessagePattern('findOneChatbot')
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  findOne(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload('id', ParseIntPipe) id: number,
  ) {
    return this.chatbotService.findOne(projectId, id);
  }

  @MessagePattern('updateChatbot')
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  update(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload() updateChatbotDto: UpdateChatbotDto,
  ) {
    return this.chatbotService.update(projectId, updateChatbotDto);
  }

  @MessagePattern('removeChatbot')
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  remove(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload('id', ParseIntPipe) id: number,
  ) {
    return this.chatbotService.remove(projectId, id);
  }
}
