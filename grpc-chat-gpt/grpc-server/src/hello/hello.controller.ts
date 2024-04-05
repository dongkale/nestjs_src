import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloRequest, HelloResponse } from './interfaces/hello.interface';

@Controller()
export class HelloController {
  @GrpcMethod('HelloService', 'sayHello')
  sayHello(request: HelloRequest): HelloResponse {
    console.log(`===[request] sayHello()`);
    return { message: `안녕하세요, ${request.name}님!` };
  }
}
