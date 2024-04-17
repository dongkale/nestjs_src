import { HttpModule } from '@nestjs/axios';
import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from './health.controller';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TerminusModule,
        HttpModule.register({ timeout: 5000, maxRedirects: 5 }),
      ],
      controllers: [HealthController],
    }).compile();

    healthController = module.get<HealthController>(HealthController);
  });

  it('should be return ok', async () => {
    const result = await healthController.check();
    expect(result.status).toBe('ok');
  });
});
