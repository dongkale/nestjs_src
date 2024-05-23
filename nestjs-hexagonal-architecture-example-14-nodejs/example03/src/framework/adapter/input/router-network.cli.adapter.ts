import { RouterNetworkInputPort } from 'src/application/port/input/router-network.input-port';
import { RouterNetworkUseCase } from 'src/application/usecase/router-network.usecase';
import { Router } from 'src/domain/entity/router';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';
import { routerNetworkFileAdapter } from 'src/framework/adapter/output/router-network.file.adapter';

export class RouterNetworkCLIAdapter {
  private _routerNetworkUsecase: RouterNetworkUseCase;

  constructor() {
    this.setAdapters();
  }

  public addNetwork(routerId: RouterId, network: Network): Router {
    return this._routerNetworkUsecase.addNetworkToRouter(routerId, network);
  }

  private setAdapters(): void {
    this._routerNetworkUsecase = new RouterNetworkInputPort(routerNetworkFileAdapter);
  }
}
