import { Inject, Injectable } from '@nestjs/common';
// import {
//   Client,
//   ClientProxy,
//   ClientProxyFactory,
//   Transport,
// } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class AdapterService {
  // private readonly client_tcp: ClientProxy;
  // private readonly client_nats: ClientProxy;
  // private nats: any;

  // constructor() {
  //   this.client_tcp = ClientProxyFactory.create({
  //     transport: Transport.TCP,
  //     options: {
  //       host: 'localhost',
  //       port: 3010,
  //     },
  //   });

  //   this.client_nats = ClientProxyFactory.create({
  //     transport: Transport.NATS,
  //     options: {
  //       servers: [
  //         'nats://localhost:14222',
  //         'nats://localhost:24222',
  //         'nats://localhost:34222',
  //       ], // NATS 서버의 주소 및 포트
  //     },
  //   });

  //   // const client: ClientProxy = ClientProxyFactory.create({
  //   //   transport: Transport.TCP,
  //   //   options: {
  //   //     host: 'localhost',
  //   //     port: 3005,
  //   //   },
  //   // });
  // }

  constructor(
    @Inject('ADAPTER_TCP_SERVICE') private readonly client_tcp: any,
    @Inject('ADAPTER_NATS_SERVICE') private readonly client_nats: any,
  ) {}

  async getHelloTCP(message: string): Promise<string> {
    const pattern = { cmd: 'hello_TCP' };
    const data = { numbers: [1, 2, 3], message: message };

    const response: string = await firstValueFrom(
      this.client_tcp.send(pattern, data).pipe(timeout(5000)),
    );

    console.log(response);

    return response;
  }

  async getHelloNats(message: string): Promise<string> {
    const pattern = { cmd: 'hello_NATS' };
    const data = { numbers: [1, 2, 3, 4, 5], message: message };

    const response: string = await firstValueFrom(
      this.client_nats.send(pattern, data).pipe(timeout(5000)),
    );

    console.log(response);

    return response;
  }

  async getHelloNatsEvent(message: string): Promise<string> {
    const pattern = { cmd: 'Event_hello_NATS' };
    const data = { numbers: [1, 2, 3, 4, 5], message: message };

    // const response: string = await firstValueFrom(
    //   this.client_nats.send(pattern, data).pipe(timeout(5000)),
    // );

    const response = this.client_nats.emit(pattern, data);

    console.log(response);

    return '';
  }
}
