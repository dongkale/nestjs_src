/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class NatsService {
  constructor(@Inject('NATS_SERVICE') private readonly nats: any) {}

  public async publish(subject: string, data: any): Promise<void> {
    this.nats.publish(subject, data);
  }

  public async subscribe(
    subject: string,
    callback: (err: any, msg: any) => void,
  ): Promise<void> {
    this.nats.subscribe(subject, callback);
  }
}
