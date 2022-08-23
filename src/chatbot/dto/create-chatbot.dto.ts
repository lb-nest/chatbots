import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsSemVer,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Flow } from 'src/shared/models';

export class CreateChatbotDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsSemVer()
  version?: string;

  @Type(() => Flow)
  @IsObject()
  @ValidateNested()
  flow: Flow;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
