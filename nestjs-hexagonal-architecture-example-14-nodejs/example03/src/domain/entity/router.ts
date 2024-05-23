import { Switch } from 'src/domain/entity/switch';
import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';
import { RouterType } from 'src/domain/vo/router.type';
import { Predicate } from 'src/utils/types';

export class Router {
  public constructor(private readonly _routerType: RouterType, private readonly _routerId: RouterId, private _networkSwitch?: Switch) {}

  public static filterRouterByType(routerType: RouterType): Predicate<Router> {
    return routerType === RouterType.CORE ? this.isCore : this.isEdge;
  }

  public static isCore: Predicate<Router> = (r) => r.getRouterType() === RouterType.CORE;

  public static isEdge: Predicate<Router> = (r) => r.getRouterType() === RouterType.EDGE;

  public addNetworkToSwitch(network: Network): void {
    this._networkSwitch = this._networkSwitch.addNetwork(network);
  }

  public createNetwork(address: IP, name: string, cidr: number): Network {
    return new Network(address, name, cidr);
  }

  public retrieveNetworks(): Network[] {
    return this._networkSwitch.getNetworks();
  }

  public getRouterType(): RouterType {
    return this._routerType;
  }

  public getRouterId(): RouterId {
    return this._routerId;
  }

  public toString(): string {
    return `
      Router { 
        type: ${RouterType[this._routerType]}, 
        id: ${this._routerId.toString()}
        networkSwitch: ${this._networkSwitch.toString()}
      }
    `;
  }
}
