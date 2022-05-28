import { Injectable } from '@nestjs/common';
import { CreateChatbotTemplateDto } from './dto/create-template.dto';
import { UpdateChatbotTemplateDto } from './dto/update-template.dto';

@Injectable()
export class ChatbotTemplateService {
  create(createChatbotTemplateDto: CreateChatbotTemplateDto) {
    return 'This action adds a new chatbotTemplate';
  }

  findAll() {
    return `This action returns all chatbotTemplate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatbotTemplate`;
  }

  update(id: number, updateChatbotTemplateDto: UpdateChatbotTemplateDto) {
    return `This action updates a #${id} chatbotTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatbotTemplate`;
  }
}
