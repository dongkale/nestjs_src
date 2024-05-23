import { Router } from 'src/domain/entity/router';
import { RouterType } from 'src/domain/vo/router.type';

export class RouterSearch {
  public static getRouters(type: RouterType, routers: Router[]): Router[] {
    return routers.filter((router) => router.isType(type));
  }
}
