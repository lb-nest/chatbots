import { PartialType } from '@nestjs/mapped-types';
import { CreateChatbotTemplateDto } from './create-chatbot-template.dto';

export class UpdateChatbotTemplateDto extends PartialType(
  CreateChatbotTemplateDto,
) {}
