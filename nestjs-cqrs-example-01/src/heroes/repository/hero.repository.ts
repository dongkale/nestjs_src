import { Injectable } from '@nestjs/common';
import { Hero } from '../models/hero.model';
import { userHero } from './fixtures/user';

@Injectable()
export class HeroRepository {
  async findOneById(id: number): Promise<Hero> {
    console.log('[HeroRepository] findOneById()');
    return userHero;
  }

  async findOneByName(name: String): Promise<Hero> {
    return userHero;
  }

  async findAll(): Promise<Hero[]> {
    return [userHero];
  }
}
