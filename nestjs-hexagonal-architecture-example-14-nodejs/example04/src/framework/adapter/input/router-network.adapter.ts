import { RouterNetworkUseCase } from 'src/application/usecase/router-network.usecase';
import { Router } from 'src/domain/entity/router';
import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';
import { AddNetworkToRouterRequest } from 'src/framework/adapter/input/dto/request/add-network-to-router.request';

export abstract class RouterNetworkAdapter {
  protected _router: Router;
  protected _routerNetworkUsecase: RouterNetworkUseCase;

  protected async _addNetworkToRouter(request: AddNetworkToRouterRequest): Promise<Router> {
    const routerId = RouterId.withId(request.routerId);
    const network = new Network(IP.fromAddress(request.address), request.name, request.cidr);

    return await this._routerNetworkUsecase.addNetworkToRouter(routerId, network);
  }

  public abstract processRequest(requestParams: unknown): Promise<Router>;
}
