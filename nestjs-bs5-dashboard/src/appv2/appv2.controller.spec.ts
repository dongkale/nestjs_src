import { Test, TestingModule } from '@nestjs/testing';
import { Appv2Controller } from './appv2.controller';

describe('Appv2Controller', () => {
  let controller: Appv2Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Appv2Controller],
    }).compile();

    controller = module.get<Appv2Controller>(Appv2Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
