import { RouterType } from 'src/domain/vo/router.type';
import { RouterViewCliAdapter } from 'src/framework/adapter/input/router-view.cli.adapter';

const cli = new RouterViewCliAdapter();
// const routers = await cli.obtainRelatedRouters(RouterType.EDGE);
// console.log(routers);

cli.obtainRelatedRouters(RouterType.EDGE).then((v) => console.log(v.toString()));
