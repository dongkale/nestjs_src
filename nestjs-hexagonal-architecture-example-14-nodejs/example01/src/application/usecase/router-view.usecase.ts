import { Router } from '../../domain/router/router.js';
import { Predicate } from '../../utils/types.js';

export interface RouterViewUsecase {
  getRouters(filter: Predicate<Router>): Promise<Router[]>;
}
