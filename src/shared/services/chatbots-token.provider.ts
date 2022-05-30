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
        ws: this.configService.get<string>('BACKEND_URL').replace('http', 'ws'),
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
