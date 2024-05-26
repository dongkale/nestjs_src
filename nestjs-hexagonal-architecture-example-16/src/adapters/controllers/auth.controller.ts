// src/adapters/controllers/auth.controller.ts
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { IAuthService } from '@/application/interfaces/iauth.service';
import { LoginDto } from '@/application/dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: IAuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  getProfile(@Request() req: Request) {
    return req.user;
  }
}
