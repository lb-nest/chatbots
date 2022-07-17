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
import { BearerAuthGuard } from 'src/auth/bearer-auth.guard';
import { User } from 'src/auth/user.decorator';
import { TransformInterceptor } from 'src/shared/interceptors/transform.interceptor';
import { ChatbotService } from './chatbot.service';
import { CreateChatbotDto } from './dto/create-chatbot.dto';
import { UpdateChatbotDto } from './dto/update-chatbot.dto';
import { Chatbot } from './entities/chatbot.entity';

@Controller('chatbots')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Post()
  create(@User() user: any, @Body() createChatbotDto: CreateChatbotDto) {
    return this.chatbotService.create(user.project.id, createChatbotDto);
  }

  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Get()
  findAll(@User() user: any) {
    return this.chatbotService.findAll(user.project.id);
  }

  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Get(':id')
  findOne(@User() user: any, @Param('id') id: string) {
    return this.chatbotService.findOne(user.project.id, Number(id));
  }

  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Patch(':id')
  update(
    @User() user: any,
    @Param('id') id: string,
    @Body() updateChatbotDto: UpdateChatbotDto,
  ) {
    return this.chatbotService.update(
      user.project.id,
      Number(id),
      updateChatbotDto,
    );
  }

  @UseGuards(BearerAuthGuard)
  @UseInterceptors(new TransformInterceptor(Chatbot))
  @Delete(':id')
  delete(@User() user: any, @Param('id') id: string) {
    return this.chatbotService.delete(user.project.id, Number(id));
  }
}
