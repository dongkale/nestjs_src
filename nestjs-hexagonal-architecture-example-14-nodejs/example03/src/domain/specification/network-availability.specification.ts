import { Router } from 'src/domain/entity/router';
import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { AbstractSpecification } from 'src/utils/specification/abstract.specification';
import { Predicate } from 'src/utils/types';

export class NetworkAvailabilitySpecification extends AbstractSpecification<Router> {
  public constructor(private _address: IP, private _name: string, private _cidr: number) {
    super();
  }

  public isSatisfiedBy(router: Router): boolean {
    return router != null && this._isNetworkAvailable(router);
  }

  private _isNetworkAvailable(router: Router): boolean {
    let availability = true;
    const predicate: Predicate<Network> = (network) =>
      network.address === this._address && network.cidr === this._cidr && network.name === this._name;

    router.retrieveNetworks().some((network) => {
      if (predicate(network)) availability = false;
      return predicate(network);
    });

    return availability;
  }
}
