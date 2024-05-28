import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, 
    private logger: Logger) {}

  @Get()
  getHello(): string {
    this.logger.log("test")
    this.logger.warn("test1")
    this.logger.warn("test2")
    this.logger.warn("test3")
    this.logger.warn("test4")
    this.logger.warn("test5")
    this.logger.warn("test6")
    this.logger.warn("재 로딩 테스트입니다.")
    this.logger.warn("재 로딩 테스트2입니다.")
    return this.appService.getHello();
  }
}
