import { Router } from 'src/domain/router';

export interface RouterViewOutputPort {
  fetchRouters(): Promise<Router[]>;
}
