import { Router } from 'src/domain/entity/router';
import { Switch } from 'src/domain/entity/switch';
import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';
import { RouterType } from 'src/domain/vo/router.type';
import { SwitchId } from 'src/domain/vo/switch.id';
import { SwitchType } from 'src/domain/vo/switch.type';
import { IPJson } from 'src/framework/adapter/output/file/json/ip.json';
import { NetworkJson } from 'src/framework/adapter/output/file/json/network.json';
import { RouterTypeJson } from 'src/framework/adapter/output/file/json/router-type.json';
import { RouterJson } from 'src/framework/adapter/output/file/json/router.json';
import { SwitchTypeJson } from 'src/framework/adapter/output/file/json/switch-type.json';
import { SwitchJson } from 'src/framework/adapter/output/file/json/switch.json';
import { UUID } from 'src/utils/uuid';

export class RouterJsonFileMapper {
  public static toDomain(routerJson: RouterJson): Router {
    const routerId: RouterId = RouterId.withId(routerJson.routerId.toString());
    const routerType: RouterType = RouterType[RouterTypeJson[routerJson.routerType]];
    const switchId: SwitchId = SwitchId.withId(routerJson.networkSwitch.switchId.toString());
    const switchType: SwitchType = SwitchType[SwitchTypeJson[routerJson.networkSwitch.switchType]];
    const ip: IP = IP.fromAddress(routerJson.networkSwitch.ip.address);
    const networks: Network[] = this._getNetworksFromJson(routerJson.networkSwitch.networks);

    const networkSwitch: Switch = new Switch(switchType, switchId, networks, ip);

    return new Router(routerType, routerId, networkSwitch);
  }

  private static _getNetworksFromJson = (networkJsons: NetworkJson[]): Network[] => {
    return networkJsons.map(
      (networkJson) => new Network(IP.fromAddress(networkJson.ip.address), networkJson.networkName, parseInt(networkJson.cidr)),
    );
  };

  public static toJson(router: Router): RouterJson {
    const routerId: UUID = router.routerId.getUUID();
    const switchId: UUID = router.networkSwitch.id.getUUID();
    const routerTypeJson: RouterTypeJson = RouterTypeJson[RouterType[router.type]];
    const switchTypeJson: SwitchTypeJson = SwitchTypeJson[SwitchType[router.networkSwitch.type]];
    const ipJson: IPJson = IPJson.fromAddress(router.networkSwitch.address.address);
    const networkDataList: NetworkJson[] = this._getNetworksFromDomain(router.retrieveNetworks());

    const switchJson: SwitchJson = new SwitchJson(switchId, ipJson, switchTypeJson, networkDataList);

    return new RouterJson(routerId, routerTypeJson, switchJson);
  }

  private static _getNetworksFromDomain(networks: Network[]): NetworkJson[] {
    return networks.map((network) => new NetworkJson(IPJson.fromAddress(network.address.address), network.name, network.cidr.toString()));
  }
}
