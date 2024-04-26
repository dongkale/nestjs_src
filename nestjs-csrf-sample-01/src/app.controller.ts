import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('form')
  getForm(@Req() request: Request & { csrfToken: () => string }) {
    return `<form action="/submit" method="POST">
              <input type="hidden" name="_csrf" value="${request.csrfToken()}">
              <input type="submit" value="Submit">
            </form>`;
  }
}
