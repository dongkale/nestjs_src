/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventPattern, Transport } from '@nestjs/microservices';

@Controller()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {
    console.log('EventsController constructor');
  }

  @EventPattern({ cmd: 'Event_hello_NATS' }, Transport.NATS)
  eventOne(data: Record<string, unknown>) {
    console.log(`[EventsController][Event_hello_NATS] ${JSON.stringify(data)}`);
  }
}
