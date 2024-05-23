import { RouterNetworkOutputPort } from 'src/application/port/output/router-network.output-port';
import { RouterNetworkUseCase } from 'src/application/usecase/router-network.usecase';
import { Router } from 'src/domain/entity/router';
import { NetworkOperation } from 'src/domain/service/network.operation';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';

export class RouterNetworkInputPort implements RouterNetworkUseCase {
  public constructor(private readonly _routerNetworkOutputPort: RouterNetworkOutputPort) {}

  addNetworkToRouter(routerId: RouterId, network: Network): Router {
    const router = this.fetchRouter(routerId);

    return this.createNetwork(router, network);
  }

  private fetchRouter(routerId: RouterId): Router {
    return this._routerNetworkOutputPort.fetchRouterById(routerId);
  }

  private createNetwork(router: Router, network: Network): Router {
    const newRouter = NetworkOperation.createNewNetwork(router, network);

    return this.persistNetwork(router) ? newRouter : router;
  }

  private persistNetwork(router: Router): boolean {
    return this._routerNetworkOutputPort.persistRouter(router);
  }
}
