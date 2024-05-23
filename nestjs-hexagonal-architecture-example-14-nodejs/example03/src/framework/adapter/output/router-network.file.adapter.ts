import { RouterNetworkOutputPort } from 'src/application/port/output/router-network.output-port';
import { Router } from 'src/domain/entity/router';
import { Switch } from 'src/domain/entity/switch';
import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';
import { RouterType } from 'src/domain/vo/router.type';
import { SwitchId } from 'src/domain/vo/switch.id';
import { SwitchType } from 'src/domain/vo/switch.type';

class RouterNetworkFileAdapter implements RouterNetworkOutputPort {
  private _routers: Router[];

  constructor() {
    this._routers = [];
    this.createSampleRouter();
  }

  private createSampleRouter(): void {
    const routerId = RouterId.withId('ca23800e-9b5a-11eb-a8b3-0242ac130003');
    const network = new Network(new IP('10.0.0.0'), 'HR', 8);
    const networkSwitch = new Switch(SwitchType.LAYER3, SwitchId.withoutId(), [network], new IP('9.0.0.9'));
    const router = new Router(RouterType.EDGE, routerId, networkSwitch);
    this._routers.push(router);
  }

  public fetchRouterById(routerId: RouterId): Router {
    let retrievedRouter: Router;

    for (const router of this._routers) {
      if (router.getRouterId().getId().equals(routerId.getId())) {
        retrievedRouter = router;
        break;
      }
    }

    return retrievedRouter;
  }

  public persistRouter(router: Router): boolean {
    return !!this._routers.push(router);
  }
}

// for singlton
export const routerNetworkFileAdapter = new RouterNetworkFileAdapter();
