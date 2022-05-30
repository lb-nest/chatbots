import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsSemVer,
  ValidateNested,
} from 'class-validator';
import { Flow } from 'src/shared/types';

export class CreateChatbotDto {
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsOptional()
  @IsSemVer()
  version?: string;

  @Type(() => Flow)
  @ValidateNested()
  flow: Flow;

  @IsOptional()
  @IsBoolean()
  enabled?: boolean;
}
