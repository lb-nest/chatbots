import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';

@SerializeOptions({
  type: Chatbot,
})
@Controller()
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @MessagePattern('createChatbot')
  create(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload() createChatbotDto: CreateChatbotDto,
  ): Promise<Chatbot> {
    return this.chatbotService.create(projectId, createChatbotDto);
  }

  @MessagePattern('findAllChatbots')
  findAll(
    @Payload('projectId', ParseIntPipe) projectId: number,
  ): Promise<Chatbot[]> {
    return this.chatbotService.findAll(projectId);
  }

  @MessagePattern('findOneChatbot')
  findOne(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload('id', ParseIntPipe) id: number,
  ): Promise<Chatbot> {
    return this.chatbotService.findOne(projectId, id);
  }

  @MessagePattern('updateChatbot')
  update(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload() updateChatbotDto: UpdateChatbotDto,
  ): Promise<Chatbot> {
    return this.chatbotService.update(projectId, updateChatbotDto);
  }

  @MessagePattern('removeChatbot')
  remove(
    @Payload('projectId', ParseIntPipe) projectId: number,
    @Payload('id', ParseIntPipe) id: number,
  ): Promise<Chatbot> {
    return this.chatbotService.remove(projectId, id);
  }
}
