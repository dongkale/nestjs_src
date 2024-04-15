import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './app.module';

describe('App (e2e)', () => {
  let app;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });
});
