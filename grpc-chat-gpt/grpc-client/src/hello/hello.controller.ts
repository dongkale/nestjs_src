import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';
import { HelloRequest, HelloResponse } from './interfaces/hello.interface';
import { Observable } from 'rxjs';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get()
  getHello(): Observable<HelloResponse> {
    // Update the return type
    // const request = new HelloRequest('ldk...');
    return this.helloService.sayHello('ldk...');
  }
}
