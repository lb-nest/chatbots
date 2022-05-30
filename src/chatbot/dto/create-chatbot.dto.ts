import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsSemVer,
  ValidateNested,
} from 'class-validator';
import { Flow } from 'src/shared/models';

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
