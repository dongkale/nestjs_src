import { Test, TestingModule } from '@nestjs/testing';

import { CommonModule } from '@/common/common.module';

import { GoogleChatController } from './google-chat.controller';
import { GoogleChatService } from './google-chat.service';

describe('GoogleChatController', () => {
  let controller: GoogleChatController;
  let service: GoogleChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [GoogleChatController],
      providers: [GoogleChatService],
    }).compile();

    controller = module.get<GoogleChatController>(GoogleChatController);
    service = module.get<GoogleChatService>(GoogleChatService);
  });

  it('정의되어야 함', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /google-chat', () => {
    it('정상적으로 메시지를 전송한다.', async () => {
      const body = {
        space: 'test',
        text: 'test message',
      };

      const result = {
        data: {
          text: 'test',
        },
      };

      const spy = jest.spyOn(service, 'send').mockResolvedValue(result);
      await controller.send(body);
      expect(spy).toBeCalledWith(body);
    });
  });
});
