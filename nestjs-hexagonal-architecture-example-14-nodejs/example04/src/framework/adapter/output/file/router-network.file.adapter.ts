import { RouterNetworkOutputPort } from 'src/application/port/output/router-network.output-port';
import { Router } from 'src/domain/entity/router';
import { RouterId } from 'src/domain/vo/router.id';
import inventory from 'resource/inventory.json';
import { IPJson } from 'src/framework/adapter/output/file/json/ip.json';
import { NetworkJson } from 'src/framework/adapter/output/file/json/network.json';
import { RouterTypeJson } from 'src/framework/adapter/output/file/json/router-type.json';
import { RouterJson } from 'src/framework/adapter/output/file/json/router.json';
import { SwitchTypeJson } from 'src/framework/adapter/output/file/json/switch-type.json';
import { SwitchJson } from 'src/framework/adapter/output/file/json/switch.json';
import { UUID } from 'src/utils/uuid';
import { writeFile } from 'fs/promises';
import { ProtocolJson } from 'src/framework/adapter/output/file/json/protocol.json';
import { RouterJsonFileMapper } from 'src/framework/adapter/output/file/mapper/router.json-file.mapper';
class RouterNetworkFileAdapter implements RouterNetworkOutputPort {
  private _routers: RouterJson[];

  constructor() {
    this._readJsonFile();
  }

  public async fetchRouterById(routerId: RouterId): Promise<Router> {
    let retrievedRouter: Router;

    for (const router of this._routers) {
      if (router.routerId.equals(routerId.getUUID())) {
        retrievedRouter = RouterJsonFileMapper.toDomain(router);
        break;
      }
    }

    return retrievedRouter;
  }

  public async persistRouter(router: Router): Promise<boolean> {
    try {
      const routerJson = RouterJsonFileMapper.toJson(router);
      await this._writeJsonFile([routerJson]);
    } catch (e) {
      new Error(e);
    }
    return true;
  }

  private async _writeJsonFile(routerJsons: RouterJson[]): Promise<void> {
    await writeFile(
      'resource/inventory.json',
      JSON.stringify(
        routerJsons.map((r) => ({
          routerId: r.routerId.toString(),
          routerType: RouterTypeJson[r.routerType],
          switch: {
            switchId: r.networkSwitch.switchId.toString(),
            ip: {
              protocol: ProtocolJson[r.networkSwitch.ip.protocol],
              address: r.networkSwitch.ip.address,
            },
            switchType: SwitchTypeJson[r.networkSwitch.switchType],
            networks: r.networkSwitch.networks.map((n) => ({
              ip: {
                protocol: ProtocolJson[n.ip.protocol],
                address: n.ip.address,
              },
              networkName: n.networkName,
              networkCidr: n.cidr,
            })),
          },
        })),
        null,
        2,
      ),
    );
  }

  private _readJsonFile(): void {
    this._routers = inventory.map(
      ({ routerId, routerType, switch: switch_ }) =>
        new RouterJson(
          UUID.fromString(routerId),
          RouterTypeJson[routerType],
          new SwitchJson(
            UUID.fromString(switch_.switchId),
            IPJson.fromAddress(switch_.ip.address),
            SwitchTypeJson[switch_.switchType],
            switch_.networks.map(
              ({ ip, networkName, networkCidr }) => new NetworkJson(IPJson.fromAddress(ip.address), networkName, networkCidr),
            ),
          ),
        ),
    );
  }
}

// for singlton
export const routerNetworkFileAdapter = new RouterNetworkFileAdapter();
