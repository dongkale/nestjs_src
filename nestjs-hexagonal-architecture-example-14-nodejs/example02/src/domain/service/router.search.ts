import { Router } from 'src/domain/entity/router';
import { Predicate } from 'src/utils/types';

export class RouterSearch {
  public static retrieveRouter(routers: Router[], predicate: Predicate<Router>): Router[] {
    return routers.filter(predicate);
  }
}
