import { Router } from 'src/domain/entity/router';
import { IP } from 'src/domain/vo/ip';
import { AbstractSpecification } from 'src/utils/specification/abstract.specification';

export class NetworkAvailabilitySpecification extends AbstractSpecification<Router> {
  public constructor(private _address: IP, private _name: string, private _cidr: number) {
    super();
  }

  public isSatisfiedBy(router: Router): boolean {
    return router != null && this._isNetworkAvailable(router);
  }

  private _isNetworkAvailable(router: Router): boolean {
    let availability = true;

    for (const network of router.retrieveNetworks()) {
      if (network.address.address === this._address.address && network.cidr === this._cidr) {
        availability = false;
        break;
      }
    }

    return availability;
  }
}
