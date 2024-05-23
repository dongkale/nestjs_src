import { IP } from 'src/domain/vo/ip';
import { Network } from 'src/domain/vo/network';
import { RouterId } from 'src/domain/vo/router.id';
import { RouterNetworkCLIAdapter } from 'src/framework/adapter/input/router-network.cli.adapter';

const cli = new RouterNetworkCLIAdapter();
const routerId = RouterId.withId('ca23800e-9b5a-11eb-a8b3-0242ac130003');
const network = new Network(new IP('20.0.0.0'), 'Marketing', 8);
const router = cli.addNetwork(routerId, network);
console.log(router.toString());
