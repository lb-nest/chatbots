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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TransformInterceptor } from 'src/shared/interceptors/transform.interceptor';
import { CreateChatbotTemplateDto } from './dto/create-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-template.dto';
import { ChatbotTemplate } from './entities/template.entity';
import { ChatbotTemplateService } from './template.service';

@Controller('chatbot-template')
export class ChatbotTemplateController {
  constructor(
    private readonly chatbotTemplateService: ChatbotTemplateService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Post()
  create(@Body() createChatbotTemplateDto: CreateChatbotTemplateDto) {
    return this.chatbotTemplateService.create(createChatbotTemplateDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Get()
  findAll() {
    return this.chatbotTemplateService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatbotTemplateService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatbotTemplateDto: UpdateChatbotTemplateDto,
  ) {
    return this.chatbotTemplateService.update(
      Number(id),
      updateChatbotTemplateDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.chatbotTemplateService.delete(Number(id));
  }
}
