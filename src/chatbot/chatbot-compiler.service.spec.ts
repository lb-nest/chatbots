import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotCompilerService } from './chatbot-compiler.service';

describe('ChatbotCompilerService', () => {
  let service: ChatbotCompilerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatbotCompilerService],
    }).compile();

    service = module.get<ChatbotCompilerService>(ChatbotCompilerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
