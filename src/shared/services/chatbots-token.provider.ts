import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';
import { TriggerType } from '../models';

@Injectable()
export class ChatbotsTokenProvider {
  constructor(private readonly configService: ConfigService) {}

  get(id: number, projectId: number, trigger: TriggerType): string {
    return jwt.sign(
      {
        id,
        ws: this.configService.get<string>('CHATBOTS_EDGE_URL'),
        project: {
          id: projectId,
        },
        trigger,
      },
      this.configService.get<string>('SECRET'),
      {
        expiresIn: 120,
      },
    );
  }
}
