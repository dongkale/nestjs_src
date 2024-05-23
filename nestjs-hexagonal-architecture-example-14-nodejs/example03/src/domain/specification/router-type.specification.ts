import { Router } from 'src/domain/entity/router';
import { RouterType } from 'src/domain/vo/router.type';
import { AbstractSpecification } from 'src/utils/specification/abstract.specification';

export class RouterTypeSpecification extends AbstractSpecification<Router> {
  isSatisfiedBy(router: Router): boolean {
    return router.getRouterType() === RouterType.EDGE || router.getRouterType() === RouterType.CORE;
  }
}
