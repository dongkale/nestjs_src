import { RouterViewOutputPort } from 'src/application/port/output/router-view.output-port';
import { RouterViewUsecase } from 'src/application/usecase/router-view.usecase';
import { Router } from 'src/domain/entity/router';
import { RouterSearch } from 'src/domain/service/router.search';
import { Predicate } from 'src/utils/types';

export class RouterViewInputPort implements RouterViewUsecase {
  public constructor(private readonly routerViewOutputPort: RouterViewOutputPort) {}

  async getRouters(filter: Predicate<Router>): Promise<Router[]> {
    const routers = await this.routerViewOutputPort.fetchRouters();

    return RouterSearch.retrieveRouter(routers, filter);
  }
}
