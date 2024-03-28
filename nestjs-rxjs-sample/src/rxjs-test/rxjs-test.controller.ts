import { Controller, Get, Param } from '@nestjs/common';
import { RxjsTestService } from './rxjs-test.service';

import { EventSubscribeHandler } from '../event-subscribe/event-subscribe';

@Controller('rxjs-test')
export class RxjsTestController {
  constructor(
    private readonly service: RxjsTestService,
    private readonly eventSubscribeHandler: EventSubscribeHandler,
  ) {
    // const data = { name: 'none', number: 0 };
    // service.addedSubscribe('event1', (arg) => {
    //   console.log('event1 수신 : ', arg);
    // });
    // service.addedSubscribe('event2', (arg) => {
    //   console.log('event2 수신 : ', arg);
    // });
    // service.addedSubscribe('event3', (arg) => {
    //   console.log('event3 수신 : ', arg);
    // });
    // service.addedSubscribeEx('event1', (arg) => {
    //   console.log('EX: event1 수신 : ', arg);
    // });
    // service.addedSubscribeEx('event2', (arg) => {
    //   console.log('EX: event2 수신 : ', arg);
    // });
    // service.addedSubscribeEx('event3', (arg) => {
    //   console.log('EX: event3 수신 : ', arg);
    // });
    // service.addedEventSubscribe('event1', (event, arg) => {
    //   console.log(`[${event}] recved : ${JSON.stringify(arg)}}`);
    // });
    // service.addedEventSubscribe('event2', (event, arg) => {
    //   console.log(`[${event}] recved : ${JSON.stringify(arg)}}`);
    // });
    // service.addedEventSubscribe('event3', (event, arg) => {
    //   console.log(`=== ${this.service.getHello()}`);
    //   console.log(`[${event}] recved : ${JSON.stringify(arg)}}`);
    //   console.log(`=== ${arg.fn()}`);
    // });
    // eventSubscribeHandler.addedEvent(
    //   'event1',
    //   'NULL',
    //   (event: string, data: any, argument: any) => {
    //     console.log(
    //       `[${event}] recved : ${JSON.stringify(argument)}}, ${data}`,
    //     );
    //   },
    // );
    // eventSubscribeHandler.addedEvent(
    //   'event2',
    //   'NULL',
    //   this.__eventSubscribeFunction,
    // );
    // eventSubscribeHandler.addedEvent(
    //   'event3',
    //   this.service.getWorld,
    //   (event: string, data: any, argument: any) => {
    //     console.log(`=== ${this.service.getHello()}`);
    //     console.log(
    //       `[${event}] recved : ${JSON.stringify(argument, null, 2)}}, ${data}`,
    //     );
    //     console.log(`=== ${argument.fn()}`);
    //     console.log(`=== ${data()}`);
    //   },
    // );

    eventSubscribeHandler.addedEvent(
      'event1',
      null,
      this.__eventSubscribeFunction,
    );

    eventSubscribeHandler.addedEvent(
      'event2',
      null,
      this.__eventSubscribeFunction,
    );

    eventSubscribeHandler.addedEvent(
      'event3',
      this.service.getWorld,
      (event: string, data: any, argument: any) => {
        console.log(`=== ${this.service.getHello()}`);
        console.log(
          `[${event}] recved : ${JSON.stringify(argument, null, 2)}}, ${data}`,
        );
        console.log(`=== ${argument.fn()}`);
        console.log(`=== ${data()}`);
      },
    );
  }

  __eventSubscribeFunction(event: string, data: any, argument: any): any {
    // console.log(`=== ${this.service.getHello()}`);
    // console.log(`=== ${this.service.getWorld()}`);

    // this.service.getWorld(); 접근 안됨

    console.log(`=====>`);

    console.log(data);

    console.log(
      `[${event}] recved: argument[${JSON.stringify(argument, null, 2)}}]`,
    );

    console.log(`===[data] ${data?.service?.getHello()}`);
    console.log(`===[data] ${data?.service?.getWorld()}`);

    console.log(`===[argument] ${argument?.service?.getHello()}`);
    console.log(`===[argument] ${argument?.service?.getWorld()}`);

    console.log(`<=====`);

    // console.log(`=== ${JSON.stringify(data)}`);
    // console.log(`=== ${argument.fn()}`);
    // console.log(`=== ${JSON.stringify(data)}`);
  }

  // __deco(event: string, data: any, argument: any): any {
  //   console.log(`=== ${this.service.getHello()}`);
  //   console.log(
  //     `[${event}] recved : ${JSON.stringify(argument, null, 2)}}, ${data}`,
  //   );
  //   console.log(`=== ${argument.fn()}`);
  //   console.log(`=== ${data()}`);
  // }

  @Get(':message')
  getHello(@Param('message') message: string): any {
    const data = { name: message, number: `id-${Date.now()}` };

    this.service.publishMessage('event1', data);

    return data; // this.appService.getHello();
  }

  @Get('event1/:message')
  getEvent1(@Param('message') message: string): any {
    const data = { name: message, number: `id-${Date.now()}`, event: 'event1' };

    // this.service.publishMessage('event1', data);
    // this.service.publishMessageEx('event1', data);
    // this.service.publishEventSubscribe('event1', data);

    this.eventSubscribeHandler.publishEvent('event1', data);

    return data; // this.appService.getHello();
  }

  @Get('event2/:message')
  getEvent2(@Param('message') message: string): any {
    const data = {
      name: message,
      number: `id-${Date.now()}`,
      event: 'event2',
      service: this.service,
      fn: this.service.getWorld,
    };

    // this.service.publishMessage('event2', data);
    // this.service.publishMessageEx('event2', data);
    // this.service.publishEventSubscribe('event2', data);

    this.eventSubscribeHandler.publishEvent('event2', data);

    return data; // this.appService.getHello();
  }

  @Get('event3/:message')
  getEvent3(@Param('message') message: string): any {
    const data = {
      name: message,
      number: `id-${Date.now()}`,
      event: 'event3',
      fn: this.service.getHello,
    };

    // this.service.publishMessage('event3', data);
    // this.service.publishMessageEx('event3', data);
    // this.service.publishEventSubscribe('event3', data);

    this.eventSubscribeHandler.publishEvent('event3', data);

    return data; // this.appService.getHello();
  }
}
