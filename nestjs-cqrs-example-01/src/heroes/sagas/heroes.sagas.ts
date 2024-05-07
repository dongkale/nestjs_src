import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import * as clc from 'cli-color';
import { Observable } from 'rxjs';
import { delay, map, mergeMap } from 'rxjs/operators';
import { DropAncientItemCommand } from '../commands/impl/drop-ancient-item.command';
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event';
import { HeroAddHpEvent } from '../events/impl/hero-add-hp.event';

const itemId = '0';

@Injectable()
export class HeroesGameSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>): Observable<ICommand> => {
    console.log(
      clc.redBright('[HeroesGameSagas] HeroKilledDragonEvent Wait...'),
    );
    return events$.pipe(
      ofType(HeroKilledDragonEvent),
      delay(1000),
      map((event) => {
        console.log(
          clc.redBright(
            '[HeroesGameSagas] HeroKilledDragonEvent ' + JSON.stringify(event),
          ),
        );
        return new DropAncientItemCommand(event.heroId, itemId);
      }),
    );
  };

  @Saga()
  addHp = (events$: Observable<any>): Observable<ICommand> => {
    console.log(clc.redBright('[HeroesGameSagas] addHp Wait...'));
    return events$.pipe(
      ofType(HeroAddHpEvent),
      delay(1000),
      mergeMap((event) => {
        console.log(
          clc.redBright(
            '[HeroesGameSagas] HeroAddHpEvent ' + JSON.stringify(event),
          ),
        );
        return [];
      }),
    );
  };
}
