import { Injectable } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  // service 에서는 MessagePattern() 안됨
  // @MessagePattern({ cmd: 'hello_TCP' })
  helloTCP(data: any) {
    console.log('Service: Hello(TCP)');
    // return { message: `Hello, ${data}!` };
    return data;
  }

  // service 에서는 MessagePattern() 안됨
  // @MessagePattern({ cmd: 'hello' })
  helloNATS(data: any) {
    console.log('Service: Hello(NATS)');
    // return { message: `Hello, ${data}!` };
    return data;
  }
}
