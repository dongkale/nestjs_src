import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @MessagePattern({ cmd: 'hello' })
  hello(data: any) {
    console.log('Service: Hello');
    return { message: `Hello, ${data.name}!` };
  }
}
