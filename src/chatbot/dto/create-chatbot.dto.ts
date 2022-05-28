import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsSemVer,
} from 'class-validator';

export class CreateChatbotDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsOptional()
  @IsSemVer()
  version?: string;

  @IsObject()
  schema: any;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
