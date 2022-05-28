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
import { CreateChatbotTemplateDto } from './dto/create-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-template.dto';
import { ChatbotTemplate } from './entities/chatbot.entity';
import { ChatbotTemplateService } from './template.service';

@Controller('chatbot-template')
export class ChatbotTemplateController {
  constructor(
    private readonly chatbotTemplateService: ChatbotTemplateService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Post()
  create(
    @Auth() user: TokenPayload,
    @Body() createChatbotTemplateDto: CreateChatbotTemplateDto,
  ) {
    return this.chatbotTemplateService.create(createChatbotTemplateDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Get()
  findAll(@Auth() user: TokenPayload) {
    return this.chatbotTemplateService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Get(':id')
  findOne(@Auth() user: TokenPayload, @Param('id') id: string) {
    return this.chatbotTemplateService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Patch(':id')
  update(
    @Auth() user: TokenPayload,
    @Param('id') id: string,
    @Body() updateChatbotTemplateDto: UpdateChatbotTemplateDto,
  ) {
    return this.chatbotTemplateService.update(+id, updateChatbotTemplateDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new TransformInterceptor(ChatbotTemplate))
  @Delete(':id')
  delete(@Auth() user: TokenPayload, @Param('id') id: string) {
    return this.chatbotTemplateService.remove(+id);
  }
}
