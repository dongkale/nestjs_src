import { RouterViewInputPort } from 'src/application/port/input/router-view.input-port';
import { RouterViewUsecase } from 'src/application/usecase/router-view.usecase';
import { Router } from 'src/domain/router';
import { RouterType } from 'src/domain/router.type';

import { routerViewFileAdapter } from 'src/framework/adapter/output/router-view.file.adapter';

export class RouterViewCliAdapter {
  private _routerViewUseCase: RouterViewUsecase;

  public constructor() {
    this._setAdapters();
  }

  public async obtainRelatedRouters(type: RouterType): Promise<Router[]> {
    return await this._routerViewUseCase.getRouters(Router.filterRouterByType(type));
  }

  private _setAdapters(): void {
    this._routerViewUseCase = new RouterViewInputPort(routerViewFileAdapter);
  }
}
