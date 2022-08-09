import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsSemVer,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Flow } from 'src/shared/models';

export class CreateChatbotDto {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @IsNotEmpty()
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
