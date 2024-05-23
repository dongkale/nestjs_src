import { RelatedRoutersCommand } from 'src/application/usecase/commands/related-routers.command';
import { Router } from 'src/domain/entity/router';

export interface RouterViewUsecase {
  getRelatedRouters(relatedRoutersCommand: RelatedRoutersCommand): Promise<Router[]>;
}
