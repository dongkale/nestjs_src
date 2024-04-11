/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  eventOne() {
    return 'eventOne';
  }
}
