import { Controller, Get, Param } from '@nestjs/common';
import { RxjsTestService } from './rxjs-test.service';

import { EventSubscribeHandler } from '../event-subscribe/event-subscribe-handler';
import { EventSubscriber } from '../event-subscribe/event-subscriber';
import { interval } from 'rxjs';

@Controller('rxjs-test')
export class RxjsTestController {
  constructor(
    private readonly service: RxjsTestService,
    private readonly eventSubscribeHandler: EventSubscribeHandler,
    private readonly eventSubscriber: EventSubscriber,
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
      this.__eventSubscribeHandlerFunction,
    );

    eventSubscribeHandler.addedEvent(
      'event2',
      null,
      this.__eventSubscribeHandlerFunction,
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

    // --------------------------------------------------------

    eventSubscriber.subscribeEvent(
      'ex-event1',
      null,
      0,
      this.__eventSubscribeFunction,
    );

    eventSubscriber.subscribeEvent(
      'ex-event2',
      null,
      0,
      this.__eventSubscribeFunction,
    );

    eventSubscriber.subscribeEvent(
      'ex-event3',
      this.service.getWorld,
      10,
      this.__eventSubscribeFunction,
    );
  }

  __eventSubscribeHandlerFunction(
    event: string,
    data: any,
    argument: any,
  ): boolean {
    // this.service.getWorld(); 접근 안됨
    console.log(data);

    console.log(
      `[${event}] recved: argument[${JSON.stringify(argument, null, 2)}}]`,
    );

    // console.log(`===[data] ${data?.service?.getHello()}`);
    // console.log(`===[data] ${data?.service?.getWorld()}`);

    // console.log(`===[argument] ${argument?.service?.getHello()}`);
    // console.log(`===[argument] ${argument?.service?.getWorld()}`);

    console.log(`<=====`);

    return true;
  }

  // event: 이벤트명
  // data: 이벤트 데이터
  // argument: 이벤트 수신시 추가로 전달받은 데이터
  __eventSubscribeFunction(
    num: number,
    event: string,
    data: any,
    argument: any,
  ): boolean {
    // this.service.getWorld(); 접근 안됨

    console.log(`[${num}]=====> `);

    console.log(data);

    argument.num = num;

    console.log(
      `[${event}] recved: argument[${JSON.stringify(argument, null, 2)}}]`,
    );

    console.log(
      `[${event}] recved: func[${argument.fn ? argument.fn(argument.name) : 'null'}]`,
    );

    console.log(`[${num}]<=====`);

    return true;
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

    this.service.publishMessage('ex-event1', data);

    return data; // this.appService.getHello();
  }

  @Get('event1/:message')
  getEvent1(@Param('message') message: string): any {
    const data = { name: message, number: `id-${Date.now()}` };

    // this.service.publishMessage('event1', data);
    // this.service.publishMessageEx('event1', data);
    // this.service.publishEventSubscribe('event1', data);

    // this.eventSubscribeHandler.publishEvent('event1', data);

    this.eventSubscriber.publishEvent('ex-event1', data);

    return data; // this.appService.getHello();
  }

  @Get('event2/:message')
  getEvent2(@Param('message') message: string): any {
    const data = {
      name: message,
      number: `id-${Date.now()}`,
      service: this.service,
      fn: this.service.getFuntion,
    };

    // this.service.publishMessage('event2', data);
    // this.service.publishMessageEx('event2', data);
    // this.service.publishEventSubscribe('event2', data);

    // this.eventSubscribeHandler.publishEvent('event2', data);

    this.eventSubscriber.publishEvent('ex-event2', data);

    return data; // this.appService.getHello();
  }

  @Get('event3/:message')
  getEvent3(@Param('message') message: string): any {
    const data = {
      num: 0,
      name: message,
      number: `id-${Date.now()}`,
      fn: this.service.getFuntion,
    };

    // this.service.publishMessage('event3', data);
    // this.service.publishMessageEx('event3', data);
    // this.service.publishEventSubscribe('event3', data);

    // this.eventSubscribeHandler.publishEvent('event3', data);

    this.eventSubscriber.publishEvent('ex-event3', data);

    return data; // this.appService.getHello();
  }
}
