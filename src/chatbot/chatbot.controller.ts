import {
  Controller,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Auth } from 'src/auth/auth.decorator';
import { BearerAuthGuard } from 'src/auth/bearer-auth.guard';
import { TokenPayload } from 'src/auth/entities/token-payload.entity';
import { PlainToClassInterceptor } from 'src/shared/interceptors/plain-to-class.interceptor';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';

@Controller('chatbots')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @MessagePattern('chatbots.create')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  create(
    @Auth() user: TokenPayload,
    @Payload('payload') createChatbotDto: CreateChatbotDto,
  ) {
    return this.chatbotService.create(user.project.id, createChatbotDto);
  }

  @MessagePattern('chatbots.findAll')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  findAll(@Auth() user: TokenPayload) {
    return this.chatbotService.findAll(user.project.id);
  }

  @MessagePattern('chatbots.findOne')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  findOne(
    @Auth() user: TokenPayload,
    @Payload('payload', ParseIntPipe) id: number,
  ) {
    return this.chatbotService.findOne(user.project.id, id);
  }

  @MessagePattern('chatbots.update')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  update(
    @Auth() user: TokenPayload,
    @Payload('payload') updateChatbotDto: UpdateChatbotDto,
  ) {
    return this.chatbotService.update(user.project.id, updateChatbotDto);
  }

  @MessagePattern('chatbots.remove')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  remove(
    @Auth() user: TokenPayload,
    @Payload('payload', ParseIntPipe) id: number,
  ) {
    return this.chatbotService.remove(user.project.id, id);
  }
}
