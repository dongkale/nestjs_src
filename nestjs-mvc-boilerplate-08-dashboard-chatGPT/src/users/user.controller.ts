import { Controller, Get, Render, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

interface CustomRequest extends Request {
  user: any;
}

@Controller('users')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('dashboard')
  @Render('dashboard/index')
  getDashboard(@Req() req: CustomRequest) {
    return { user: req.user };
  }
}
