import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotTemplateController } from './template.controller';
import { ChatbotTemplateService } from './template.service';

describe('ChatbotTemplateController', () => {
  let controller: ChatbotTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatbotTemplateController],
      providers: [ChatbotTemplateService],
    }).compile();

    controller = module.get<ChatbotTemplateController>(
      ChatbotTemplateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
