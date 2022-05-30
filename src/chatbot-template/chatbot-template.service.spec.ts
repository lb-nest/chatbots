import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotTemplateService } from './chatbot-template.service';

describe('ChatbotTemplateService', () => {
  let service: ChatbotTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatbotTemplateService],
    }).compile();

    service = module.get<ChatbotTemplateService>(ChatbotTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
