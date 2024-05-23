import { RouterTypeJson } from 'src/framework/adapter/output/file/json/router-type.json';
import { SwitchJson } from 'src/framework/adapter/output/file/json/switch.json';
import { UUID } from 'src/utils/uuid';

export class RouterJson {
  public constructor(
    private readonly _routerId: UUID,
    private readonly _routerType: RouterTypeJson,
    private readonly _networkSwitch: SwitchJson,
  ) {}

  get routerId(): UUID {
    return this._routerId;
  }

  get routerType(): RouterTypeJson {
    return this._routerType;
  }

  get networkSwitch(): SwitchJson {
    return this._networkSwitch;
  }
}
