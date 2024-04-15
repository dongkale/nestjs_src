import { Body, Controller, Param, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthRequest } from './dtos/auth.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(':vendor')
  async authenticate(
    @Param('vendor') vendor: string,
    @Body() body: AuthRequest,
  ) {
    const { code, redirectUri } = body;

    return this.authService.authenticate({ vendor, code, redirectUri });
  }
}
