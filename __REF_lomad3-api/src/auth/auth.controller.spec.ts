import { Test } from '@nestjs/testing';

import { CommonModule } from '@/common/common.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CommonModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
  });

  it('정의되어야 함', () => {
    expect(authController).toBeDefined();
  });
});
