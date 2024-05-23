import { Router } from 'src/domain/entity/router';
import { Predicate } from 'src/utils/types';

export interface RouterViewUsecase {
  getRouters(filter: Predicate<Router>): Promise<Router[]>;
}
