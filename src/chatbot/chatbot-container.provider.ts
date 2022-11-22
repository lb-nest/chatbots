import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatbotContainerProvider {
  private readonly separator = ',';

  private urls: string[];

  constructor(configService: ConfigService) {
    this.urls = configService
      .get<string>('CHATBOTS_CONTAINER_URLS')
      .split(this.separator);
  }

  get(): string {
    const index = Math.round(Math.random() * (this.urls.length - 1));
    return this.urls[index];
  }
}
