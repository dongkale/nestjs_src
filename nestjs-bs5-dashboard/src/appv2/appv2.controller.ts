import { Controller, Get } from '@nestjs/common';
import { AppService } from '../common/modules/global/app.service';

@Controller({
  version: '2',
})
export class Appv2Controller {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHelloV2();
  }
}
