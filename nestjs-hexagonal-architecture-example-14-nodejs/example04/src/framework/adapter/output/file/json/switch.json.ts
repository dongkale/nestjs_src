import { IPJson } from 'src/framework/adapter/output/file/json/ip.json';
import { NetworkJson } from 'src/framework/adapter/output/file/json/network.json';
import { SwitchTypeJson } from 'src/framework/adapter/output/file/json/switch-type.json';
import { UUID } from 'src/utils/uuid';

export class SwitchJson {
  public constructor(
    private readonly _switchId: UUID,
    private readonly _ip: IPJson,
    private readonly _switchType: SwitchTypeJson,
    private readonly _networks: NetworkJson[],
  ) {}

  get switchId(): UUID {
    return this._switchId;
  }

  get ip(): IPJson {
    return this._ip;
  }

  get switchType(): SwitchTypeJson {
    return this._switchType;
  }

  get networks(): NetworkJson[] {
    return this._networks;
  }
}
