import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign } from 'jsonwebtoken';

@Injectable()
export class ChatbotsTokenProvider {
  constructor(private readonly configService: ConfigService) {}

  get(id: number, projectId: number): string {
    return sign(
      {
        id,
        ws: 'ws://127.0.0.1:10100',
        project: {
          id: projectId,
        },
      },
      this.configService.get<string>('SECRET'),
    );
  }
}
