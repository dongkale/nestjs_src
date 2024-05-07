import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { HeroAddHpEvent } from '../impl/hero-add-hp.event';

@EventsHandler(HeroAddHpEvent)
export class HeroAddHpHandler implements IEventHandler<HeroAddHpEvent> {
  handle(event: HeroAddHpEvent) {
    console.log(clc.yellowBright('[HeroAddHpHandler] HeroAddHpEvent...'));
  }
}
