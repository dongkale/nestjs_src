import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern({ cmd: 'hello' })
  hello(data: any) {
    console.log(`Service: Hello => data: ${JSON.stringify(data)}`);

    return { message: `Hello, ${JSON.stringify(data)}!` };
  }

  // @MessagePattern('hello')
  // hello(data: any) {
  //   console.log('Service: Hello');
  //   return { message: `Hello, ${data}!` };
  // }
}
