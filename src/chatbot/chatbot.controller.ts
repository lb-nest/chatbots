import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { TokenPayload } from 'src/auth/entities/token-payload.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from 'src/shared/interceptors/transform.interceptor';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';

@Controller('chatbots')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Post()
  create(
    @Auth() user: TokenPayload,
    @Body() createChatbotDto: CreateChatbotDto,
  ) {
    return this.chatbotService.create(user.project.id, createChatbotDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Get()
  findAll(@Auth() user: TokenPayload) {
    return this.chatbotService.findAll(user.project.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Get(':id')
  findOne(@Auth() user: TokenPayload, @Param('id') id: string) {
    return this.chatbotService.findOne(user.project.id, Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Patch(':id')
  update(
    @Auth() user: TokenPayload,
    @Param('id') id: string,
    @Body() updateChatbotDto: UpdateChatbotDto,
  ) {
    return this.chatbotService.update(
      user.project.id,
      Number(id),
      updateChatbotDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Delete(':id')
  delete(@Auth() user: TokenPayload, @Param('id') id: string) {
    return this.chatbotService.delete(user.project.id, Number(id));
  }
}
