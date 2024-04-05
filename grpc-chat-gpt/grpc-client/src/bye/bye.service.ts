import { Injectable } from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ByeRequest, ByeResponse } from './interfaces/bye.interface';

@Injectable()
export class ByeService {
  @Client({
    transport: Transport.GRPC,
    options: {
      // url: 'localhost:5000',
      package: 'bye',
      protoPath: '../proto/bye.proto',
    },
  })
  private readonly client: ClientGrpc;

  private byeService;

  onModuleInit() {
    this.byeService = this.client.getService<ByeService>('ByeService'); // proto 에 있는 ByeService
  }

  sayBye(name: string): Observable<ByeResponse> {
    console.log(`===[call] sayBye()`);
    return this.byeService.sayBye({ name });
  }
}
