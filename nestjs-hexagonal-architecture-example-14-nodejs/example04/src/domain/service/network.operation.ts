import { Router } from 'src/domain/entity/router';
import { CIDRSpecification } from 'src/domain/specification/cidr.specification';
import { NetworkAmountSpecification } from 'src/domain/specification/network-amount.specification';
import { NetworkAvailabilitySpecification } from 'src/domain/specification/network-availability.specification';
import { RouterTypeSpecification } from 'src/domain/specification/router-type.specification';
import { Network } from 'src/domain/vo/network';

/**
 * 새로운 네트워크 객체를 생성하고 해당 객체를 라우터에 연결된 스위치에 추가
 */
export class NetworkOperation {
  public static createNewNetwork(router: Router, network: Network): Router {
    const availabilitySpec = new NetworkAvailabilitySpecification(network.address, network.name, network.cidr);
    const cidrSpec = new CIDRSpecification();
    const routerTypeSpec = new RouterTypeSpecification();
    const amountSpec = new NetworkAmountSpecification();

    if (!cidrSpec.isSatisfiedBy(network.cidr)) throw new Error(`CIDR is below ${CIDRSpecification.MINIMUM_ALLOWED_CIRD}`);
    if (!availabilitySpec.isSatisfiedBy(router)) throw new Error('Address already exist');
    if (!amountSpec.isSatisfiedBy(router)) throw new Error('Network amount not satisfied');
    if (!routerTypeSpec.isSatisfiedBy(router)) throw new Error('Router type is not satisfied');

    const _network = router.createNetwork(network.address, network.name, network.cidr);
    router.addNetworkToSwitch(_network);

    return router;
  }
}
