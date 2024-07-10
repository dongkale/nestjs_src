import { Controller, Get, Post, Render, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from './common/guards/login.guard';
import { LoginFailedExceptionFilter } from './common/filters/login-failed-exceptions.filters';

@Controller()
export class AppController {
  @Get()
  @Render('public/home')
  homepage() {
    return
  }

  @Get('sign-up')
  @Render('users/new')
  signUp(@Request() req): object {
    return {
      // csrfToken: req.csrfToken(),
      pageTitle: "Sign Up"
    }
  }

  @Get('login')
  @Render('public/login')
  loginPage(@Request() req) {
    return {
      // csrfToken: req.csrfToken(),
      pageTitle: "Login",
      // flashMessage: req.flash('alert')[0]
    }
  }

  @UseGuards(LoginGuard)
  @UseFilters(LoginFailedExceptionFilter)
  @Post('/login')
  login(@Request() req, @Res() res: Response, csrfProtection) {
    res.redirect(`/users/${req.user.id}`);
  }

  @Post('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/');
  }
}
