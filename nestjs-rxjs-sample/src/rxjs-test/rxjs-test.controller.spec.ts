import { Test, TestingModule } from '@nestjs/testing';
import { RxjsTestController } from './rxjs-test.controller';

describe('RxjsTestController', () => {
  let controller: RxjsTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RxjsTestController],
    }).compile();

    controller = module.get<RxjsTestController>(RxjsTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
