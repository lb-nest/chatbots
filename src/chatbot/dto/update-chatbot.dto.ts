import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateChatbotDto } from './create-chatbot.dto';

export class UpdateChatbotDto extends PartialType(CreateChatbotDto) {
  @IsInt()
  id: number;
}
