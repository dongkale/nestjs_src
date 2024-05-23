import { Switch } from 'src/domain/entity/switch';
import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';
import { RouterType } from 'src/domain/vo/router.type';
import { Predicate } from 'src/utils/types';

export class Router {
  public constructor(private readonly _type: RouterType, private readonly _routerId: RouterId, private _networkSwitch?: Switch) {}

  public static filterRouterByType(routerType: RouterType): Predicate<Router> {
    return routerType === RouterType.CORE ? this.isCore : this.isEdge;
  }

  public static isCore: Predicate<Router> = (r) => r.type === RouterType.CORE;

  public static isEdge: Predicate<Router> = (r) => r.type === RouterType.EDGE;

  public isType(type: RouterType): boolean {
    return this._type === type;
  }

  public addNetworkToSwitch(network: Network): void {
    this._networkSwitch = this._networkSwitch.addNetwork(network);
  }

  public createNetwork(address: IP, name: string, cidr: number): Network {
    return new Network(address, name, cidr);
  }

  public retrieveNetworks(): Network[] {
    return this._networkSwitch.getNetworks();
  }

  public get type(): RouterType {
    return this._type;
  }

  public get routerId(): RouterId {
    return this._routerId;
  }

  public get networkSwitch(): Switch {
    return this._networkSwitch;
  }

  public toString(): string {
    return `
      Router { 
        type: ${RouterType[this._type]}, 
        id: ${this._routerId.toString()}
        networkSwitch: ${this._networkSwitch.toString()}
      }
    `;
  }
}
