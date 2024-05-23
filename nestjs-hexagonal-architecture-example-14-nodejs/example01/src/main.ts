import { RouterType } from 'src/domain/router.type';
import { RouterViewCliAdapter } from 'src/framework/adapter/input/router-view.cli.adapter';

const cli = new RouterViewCliAdapter();
cli.obtainRelatedRouters(RouterType.EDGE).then((routers) => routers.forEach((r) => console.log(r.toString())));
