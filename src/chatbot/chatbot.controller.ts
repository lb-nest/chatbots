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
    @Auth() auth: TokenPayload,
    @Payload('payload') createChatbotDto: CreateChatbotDto,
  ) {
    return this.chatbotService.create(auth.project.id, createChatbotDto);
  }

  @MessagePattern('chatbots.findAll')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  findAll(@Auth() auth: TokenPayload) {
    return this.chatbotService.findAll(auth.project.id);
  }

  @MessagePattern('chatbots.findOne')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  findOne(
    @Auth() auth: TokenPayload,
    @Payload('payload', ParseIntPipe) id: number,
  ) {
    return this.chatbotService.findOne(auth.project.id, id);
  }

  @MessagePattern('chatbots.update')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  update(
    @Auth() auth: TokenPayload,
    @Payload('payload') updateChatbotDto: UpdateChatbotDto,
  ) {
    return this.chatbotService.update(auth.project.id, updateChatbotDto);
  }

  @MessagePattern('chatbots.remove')
  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new PlainToClassInterceptor(Chatbot))
  remove(
    @Auth() auth: TokenPayload,
    @Payload('payload', ParseIntPipe) id: number,
  ) {
    return this.chatbotService.remove(auth.project.id, id);
  }
}
