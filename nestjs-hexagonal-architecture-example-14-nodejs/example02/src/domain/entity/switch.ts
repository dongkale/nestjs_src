import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { SwitchId } from 'src/domain/vo/switch.id';
import { SwitchType } from 'src/domain/vo/switch.type';

export class Switch {
  public constructor(private _type: SwitchType, private _id: SwitchId, private _networks: Network[], private _address: IP) {}

  public addNetwork(network: Network): Switch {
    const networks = [...this._networks, network];
    return new Switch(this._type, this._id, networks, this._address);
  }

  public getNetworks(): Network[] {
    const copied = [...this._networks];
    return copied;
  }
}
