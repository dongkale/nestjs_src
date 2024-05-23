import { Interface } from 'readline/promises';
import { RouterNetworkUseCase } from 'src/application/usecase/router-network.usecase';
import { Router } from 'src/domain/entity/router';
import { AddNetworkToRouterRequest } from 'src/framework/adapter/input/dto/request/add-network-to-router.request';
import { RouterNetworkAdapter } from 'src/framework/adapter/input/router-network.adapter';
import { RouterJsonFileMapper } from 'src/framework/adapter/output/file/mapper/router.json-file.mapper';

export class RouterNetworkCLIAdapter extends RouterNetworkAdapter {
  constructor(protected readonly _routerNetworkUsecase: RouterNetworkUseCase) {
    super();
  }

  public async processRequest(requestParams: unknown): Promise<Router> {
    const request = await this._stdinParams(requestParams as Interface);
    this._router = await this._addNetworkToRouter(request);

    const routerJson = RouterJsonFileMapper.toJson(this._router);
    console.log(routerJson);
    return this._router;
  }

  private async _stdinParams(requestParams: Interface): Promise<AddNetworkToRouterRequest> {
    const rl = requestParams;

    const result: AddNetworkToRouterRequest = {
      routerId: await rl.question('> Please inform the Router ID : '),
      address: await rl.question('> Please inform the IP address : '),
      name: await rl.question('> Please inform the Network Name : '),
      cidr: parseInt(await rl.question('> Please inform the CIDR : ')),
    };
    rl.close();

    return result;
  }
}
