import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('api-key'))
  getHello(): string {
    this.logger.log('Calling getHello()');

    return this.appService.getHello();
  }
}
