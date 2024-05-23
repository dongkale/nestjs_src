import { Router } from 'src/domain/entity/router';

export interface RouterViewOutputPort {
  fetchRelatedRouters(): Promise<Router[]>;
}
