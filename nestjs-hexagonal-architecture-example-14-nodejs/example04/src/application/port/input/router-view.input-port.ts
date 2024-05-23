import { RouterViewOutputPort } from 'src/application/port/output/router-view.output-port';
import { RelatedRoutersCommand } from 'src/application/usecase/commands/related-routers.command';
import { RouterViewUsecase } from 'src/application/usecase/router-view.usecase';
import { Router } from 'src/domain/entity/router';
import { RouterSearch } from 'src/domain/service/router.search';
import { RouterType } from 'src/domain/vo/router.type';

export class RouterViewInputPort implements RouterViewUsecase {
  public constructor(private readonly _routerViewOutputPort: RouterViewOutputPort) {}

  public async getRelatedRouters(relatedRoutersCommand: RelatedRoutersCommand): Promise<Router[]> {
    const type = relatedRoutersCommand.type;
    const routers = await this._routerViewOutputPort.fetchRelatedRouters();
    return this._fetchRelatedEdgeRouters(type, routers);
  }

  private _fetchRelatedEdgeRouters(type: RouterType, routers: Router[]): Router[] {
    return RouterSearch.getRouters(type, routers);
  }
}
