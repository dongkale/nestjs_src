import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HelloRequest, HelloResponse } from './interfaces/hello.interface';

// interface HelloRequest {
//   name: string;
// }

// interface HelloResponse {
//   message: string;
// }

@Injectable()
export class HelloService {
  @Client({
    transport: Transport.GRPC,
    options: {
      // url: 'localhost:5000',
      package: 'hello',
      protoPath: '../proto/hello.proto',
    },
  })
  private readonly client: ClientGrpc;

  private helloService;

  onModuleInit() {
    this.helloService = this.client.getService<HelloService>('HelloService'); // proto 에 있는 ByeService
  }

  sayHello(name: string): Observable<HelloResponse> {
    console.log(`===[call] sayHello()`);
    return this.helloService.sayHello({ name });
  }
}
