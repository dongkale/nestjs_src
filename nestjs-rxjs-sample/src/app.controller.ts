import {
  Controller,
  Get,
  Param,
  All,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

import { EventSubscribeHandler } from './event-subscribe/event-subscribe';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventSubscribeHandler: EventSubscribeHandler,
  ) {
    // const data = { name: 'none', number: 0 };
    // this.appService.addDataRxjs(data);

    eventSubscribeHandler.addedEvent(
      'app_event1',
      null,
      this.__eventSubscribeFunction,
    );
  }

  __eventSubscribeFunction(event: string, data: any, argument: any): any {
    console.log(`=====>`);

    console.log(data);

    console.log(
      `[${event}] recved: argument[${JSON.stringify(argument, null, 2)}}]`,
    );

    console.log(`<=====`);
  }

  // @All('/')
  // default(@Req() req: Request, @Res() res: Response) {
  //   // res.status(HttpStatus.OK).send({ result: '1234' });

  //   const data = { name: 'text', number: 12345 };

  //   this.appService.addDataRxjs(data);
  // }

  // @Get(':message')
  // getMessage(@Param('message') message: string): any {
  //   const data = { name: message, number: `id-${Date.now()}` };

  //   this.appService.addDataRxjs(data);

  //   return data; // this.appService.getHello();
  // }

  @Get('/hello/:message')
  getHello(@Param('message') message: string): any {
    const data = {
      name: message,
      number: `id-${Date.now()}`,
      event: 'app_event1',
    };

    this.eventSubscribeHandler.publishEvent('app_event1', data);

    return data; // this.appService.getHello();
  }
}
