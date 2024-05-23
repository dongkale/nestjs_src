import { RouterType } from 'src/domain/vo/router.type';

export class RelatedRoutersCommand {
  private _type: RouterType;

  public constructor(type: string) {
    this._type = RouterType[type];
  }

  public get type(): RouterType {
    return this._type;
  }
}
