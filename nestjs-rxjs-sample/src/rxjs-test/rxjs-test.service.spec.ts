import { Test, TestingModule } from '@nestjs/testing';
import { RxjsTestService } from './rxjs-test.service';

describe('RxjsTestService', () => {
  let service: RxjsTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RxjsTestService],
    }).compile();

    service = module.get<RxjsTestService>(RxjsTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
