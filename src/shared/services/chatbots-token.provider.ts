import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

@Injectable()
export class ChatbotsTokenProvider {
  constructor(private readonly configService: ConfigService) {}

  get(id: number, projectId: number): string {
    return jwt.sign(
      {
        id,
        ws: this.configService.get<string>('CHATBOTS_EDGE_URL'),
        project: {
          id: projectId,
        },
      },
      this.configService.get<string>('SECRET'),
      {
        expiresIn: 120,
      },
    );
  }
}
