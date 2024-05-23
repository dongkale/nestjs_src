import { Router } from 'src/domain/entity/router';

export interface RouterViewOutputPort {
  fetchRouters(): Promise<Router[]>;
}
