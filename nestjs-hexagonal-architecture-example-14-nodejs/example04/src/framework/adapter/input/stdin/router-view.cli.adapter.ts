import { RouterViewInputPort } from 'src/application/port/input/router-view.input-port';
import { RelatedRoutersCommand } from 'src/application/usecase/commands/related-routers.command';
import { RouterViewUsecase } from 'src/application/usecase/router-view.usecase';
import { Router } from 'src/domain/entity/router';
import { routerViewFileAdapter } from 'src/framework/adapter/output/file/router-view.file.adapter';

export class RouterViewCliAdapter {
  private _routerViewUseCase: RouterViewUsecase;

  public constructor() {
    this._setAdapters();
  }

  public async obtainRelatedRouters(type: string): Promise<Router[]> {
    const relatedRoutersCommand: RelatedRoutersCommand = new RelatedRoutersCommand(type);
    return await this._routerViewUseCase.getRelatedRouters(relatedRoutersCommand);
  }

  private _setAdapters(): void {
    this._routerViewUseCase = new RouterViewInputPort(routerViewFileAdapter);
  }
}
