import { AggregateRoot } from '@nestjs/cqrs';
import { HeroFoundItemEvent } from '../events/impl/hero-found-item.event';
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event';
import { HeroAddHpEvent } from '../events/impl/hero-add-hp.event';

export class Hero extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  killEnemy(enemyId: string) {
    // logic
    this.apply(new HeroKilledDragonEvent(this.id, enemyId));

    console.log('[Hero] HeroKilledDragonEvent Awake...');
  }

  addItem(itemId: string) {
    // logic
    this.apply(new HeroFoundItemEvent(this.id, itemId));

    console.log('[Hero] HeroFoundItemEvent Awake...');
  }

  addHp(enemyId: string) {
    // logic
    this.apply(new HeroAddHpEvent(this.id, enemyId));

    console.log('[Hero] HeroAddHpEvent Awake...');
  }
}
