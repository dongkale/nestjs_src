import { Router } from 'src/domain/entity/router';
import { AbstractSpecification } from 'src/utils/specification/abstract.specification';

export class NetworkAmountSpecification extends AbstractSpecification<Router> {
  public static readonly MAXIMUM_ALLOWED_NETWORKS = 6;

  isSatisfiedBy(router: Router): boolean {
    return router.retrieveNetworks().length <= NetworkAmountSpecification.MAXIMUM_ALLOWED_NETWORKS;
  }
}
