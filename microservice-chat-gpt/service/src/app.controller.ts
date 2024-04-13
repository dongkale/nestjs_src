import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  Transport,
  NatsContext,
} from '@nestjs/microservices';
import { AppInterceptor } from './app.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(new AppInterceptor())
  @MessagePattern({ cmd: 'hello_TCP' }, Transport.TCP)
  helloTCP(@Payload() data: any, @Ctx() context: NatsContext) {
    console.log(`Service: Hello => data: ${JSON.stringify(data)}`);
    // console.log(context);

    // return { message: `Hello, ${JSON.stringify(data)}!` };
    return this.appService.helloTCP(data);
  }

  @MessagePattern({ cmd: 'hello_NATS' }, Transport.NATS)
  helloNATS(@Payload() data: any) {
    console.log(`Service: Hello => data: ${JSON.stringify(data)}`);

    // return { message: `Hello, ${JSON.stringify(data)}!` };
    return this.appService.helloNATS(data);
  }

  @EventPattern({ cmd: 'Event_hello_NATS' }, Transport.NATS)
  async helloEventNATS(data: Record<string, unknown>) {
    console.log(`[AppController][Event_hello_NATS] ${JSON.stringify(data)}`);
  }

  // @MessagePattern('hello')
  // hello(data: any) {
  //   console.log('Service: Hello');
  //   return { message: `Hello, ${data}!` };
  // }
}
