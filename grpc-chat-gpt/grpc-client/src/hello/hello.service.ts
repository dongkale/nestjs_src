import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { HelloRequest, HelloResponse } from './interfaces/hello.interface';

interface HelloProtoService {
  sayHello(data: HelloRequest): Observable<HelloResponse>;
}

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

  private helloService: HelloProtoService;

  onModuleInit() {
    this.helloService =
      this.client.getService<HelloProtoService>('HelloProtoService'); // proto 에 있는 ByeService
  }

  sayHello(name: string): Observable<HelloResponse> {
    console.log(`===[call] sayHello()`);
    return this.helloService.sayHello({ name });
  }
}
