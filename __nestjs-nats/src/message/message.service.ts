import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class MessageService {
//   private client: ClientProxy;

//   constructor() {
//     this.client = ClientProxyFactory.create({
//       transport: Transport.NATS,
//       options: {
//         servers: ['nats://localhost:4222'], // NATS 서버의 주소 및 포트
//       },
//     });
//   }

//   async sendMessage(message: string): Promise<void> {
//     await this.client.emit('message_event', message).toPromise();
//   }

//   async receiveMessage(callback: (message: string) => void): Promise<void> {
//     await this.client.connect().then(() => {
//       // this.client.send('message_event', {}).subscribe(callback);
//       console.log('Connected to NATS');
//     });
//   }
}
