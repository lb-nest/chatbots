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
  @IsSemVer()
  version?: string;

  @Type(() => Flow)
  @ValidateNested()
  @IsObject()
  flow: Flow;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
