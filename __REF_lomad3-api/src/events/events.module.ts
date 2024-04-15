import { Module } from '@nestjs/common';

import { CommonModule } from '@/common/common.module';

import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [CommonModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
