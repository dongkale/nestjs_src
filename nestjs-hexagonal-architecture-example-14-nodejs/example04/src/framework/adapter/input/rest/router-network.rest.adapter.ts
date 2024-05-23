import { RouterNetworkUseCase } from 'src/application/usecase/router-network.usecase';
import { Router } from 'src/domain/entity/router';
import { RouterNetworkAdapter } from 'src/framework/adapter/input/router-network.adapter';
import { WebApp } from 'src/web-app.factory';

export class RouterNetworkRestAdapter extends RouterNetworkAdapter {
  constructor(protected readonly _routerNetworkUsecase: RouterNetworkUseCase) {
    super();
  }

  public async processRequest(requestParams: WebApp): Promise<Router> {
    const app = requestParams;

    app.applyRouter('POST', '/network', async (req, res) => {
      try {
        this._router = await this._addNetworkToRouter(req.body);
        res.send(this._router.toString());
      } catch (e) {
        res.status(400).json(e.message);
      }
    });

    return this._router;
  }
}
