import {
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @Render('auth/login')
  getLogin() {
    return;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async postLogin(@Req() req: Request, @Res() res: Response) {
    const jwt = await this.authService.login(req.user);
    res.cookie('jwt', jwt.access_token, { httpOnly: true });
    return res.redirect('/users/dashboard');
  }

  @Get('register')
  @Render('auth/register')
  getRegister() {
    return;
  }

  @Post('register')
  async postRegister(@Req() req: Request, @Res() res: Response) {
    // 회원 가입 로직 구현
    return res.redirect('/auth/login');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    // JWT 쿠키 삭제
    res.clearCookie('jwt');
    return res.redirect('/auth/login');
  }
}
