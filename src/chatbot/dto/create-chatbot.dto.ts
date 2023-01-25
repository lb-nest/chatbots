import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsSemVer,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Flow } from '../entities/flow.entity';

export class CreateChatbotDto {
  @Transform(({ value }) => value?.trim())
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
