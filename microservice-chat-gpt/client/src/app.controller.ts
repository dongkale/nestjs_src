import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { connect, Payload } from 'ts-nats';

import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import { MessagePattern } from '@nestjs/microservices';
import { time } from 'console';

@Controller()
export class AppController {
  private readonly client: ClientProxy;
  private nats: any;

  constructor(private readonly appService: AppService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: ['nats://localhost:4222'], // NATS 서버의 주소 및 포트
      },
    });

    // this.nats = connect({
    //   servers: ['nats://localhost:4222'], // NATS 서버의 주소 및 포트
    // });
  }

  @Get()
  async getHello(): Promise<string> {
    // const client: ClientProxy = ClientProxyFactory.create({
    //   transport: Transport.NATS,
    //   options: {
    //     servers: ['nats://localhost:4222'], // NATS 서버의 주소 및 포트
    //   },
    // });

    // const pattern = { cmd: 'add' };
    // const data = [1, 2];

    // const result = await client.send<number>(pattern, data);
    // console.log('Result:', result);

    // const client: ClientProxy = ClientProxyFactory.create({
    //   transport: Transport.TCP,
    //   options: {
    //     host: 'localhost',
    //     port: 3005,
    //   },
    // });

    const pattern = { cmd: 'hello' };
    const data = { data: [1, 2, 3] };

    // const response0 = await client.send<number>(pattern, data);

    // const response1 = await this.client
    //   .send(pattern, data)
    //   .subscribe((result) => {
    //     console.log('Result:', result);
    //   })

    // const response2 = await firstValueFrom(
    //   this.client.send(pattern, data as any),
    // );

    const response3 = await firstValueFrom(
      this.client.send(pattern, data).pipe(timeout(5000)),
    );

    // console.log(response0);
    // console.log(response1);
    // console.log(response2);
    console.log(response3);

    // client.emit('hello', { data: 'Hello World' });

    return this.appService.getHello();
  }

  @Get('world')
  async getWorld(): Promise<string> {
    const pattern = { cmd: 'hello' };
    const data = { data: [1, 2, 3] };

    // const response2 = await firstValueFrom(
    //   this.client.send(pattern, data as any),
    // );

    // console.log(response2);

    // const response1 = await this.client.connect();

    // response1.on('hello', (data) => {
    //   console.log('Data:', data);
    // });

    // this.client.emit(pattern, data).subscribe((result) => {
    //   console.log('Result:', result);
    // });

    this.nats = await connect({
      servers: ['nats://localhost:4222'], // NATS 서버의 주소 및 포트
    });

    // const subscription = nc.subscribe('hello', (err, msg) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   console.log(msg);
    // });

    const sub = await this.nats.subscribe(
      'call',
      (err, msg) => {
        if (err) {
          console.log(err);
        }
        console.log(msg);
      },
      {},
    );

    //const msg = await nats.request('hello', null, data);
    const msg = await this.nats.publish('call', 'NATS');

    //   .request('hello', data, Option, (data, reply, subject, sid) => {
    //   console.log(data);
    //   console.log(reply);
    //   console.log(subject);
    //   console.log(sid);
    // });

    console.log(sub);
    console.log(msg);

    // subscription.on('message', (msg: Payload) => {
    //   console.log(msg);
    // });

    // subscription.on('message', (msg: Payload) => {
    //   console.log(msg);
    // });

    return this.appService.getHello();
  }

  @Get('world2')
  async getWorld2(): Promise<string> {
    const msg = this.nats.publish('call', 'NATS');

    console.log(msg);

    return this.appService.getHello();
  }
}
