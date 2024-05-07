export class HeroAddHpEvent {
  constructor(
    public readonly heroId: string,
    public readonly enemyId: string,
  ) {}
}
