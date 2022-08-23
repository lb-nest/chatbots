import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateChatbotTemplateDto } from './create-chatbot-template.dto';

export class UpdateChatbotTemplateDto extends PartialType(
  CreateChatbotTemplateDto,
) {
  @IsInt()
  id: number;
}
