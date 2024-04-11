import { EventsController } from './events.controller';
import { EventsService } from './events.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
