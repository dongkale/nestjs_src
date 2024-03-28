import { Controller, Get, All, Req, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    const data = { name: 'text', number: 12345 };

    this.appService.addDataRxjs(data);
  }

  // @All('/')
  // default(@Req() req: Request, @Res() res: Response) {
  //   // res.status(HttpStatus.OK).send({ result: '1234' });

  //   const data = { name: 'text', number: 12345 };

  //   this.appService.addDataRxjs(data);
  // }

  @Get()
  getHello(): string {
    const data = { name: 'text', number: 12345 };

    this.appService.addDataRxjs(data);
    return this.appService.getHello();
  }
}
