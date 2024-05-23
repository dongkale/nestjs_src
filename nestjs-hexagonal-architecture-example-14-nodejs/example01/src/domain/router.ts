import { RouterId } from 'src/domain/router.id';
import { RouterType } from 'src/domain/router.type';
import { Predicate } from 'src/utils/types';

export class Router {
  public constructor(private readonly _routerType: RouterType, private readonly _routerId: RouterId) {}

  public static filterRouterByType(routerType: RouterType): Predicate<Router> {
    return routerType === RouterType.CORE ? this.isCore : this.isEdge;
  }
  public static isCore: Predicate<Router> = (r) => r.getRouterType() === RouterType.CORE;

  public static isEdge: Predicate<Router> = (r) => r.getRouterType() === RouterType.EDGE;

  public static retrieveRouter(routers: Router[], predicate: Predicate<Router>): Router[] {
    return routers.filter(predicate);
  }

  public getRouterType(): RouterType {
    return this._routerType;
  }

  public toString(): string {
    return `Router { type: ${RouterType[this._routerType]}, id: ${this._routerId.toString()} }`;
  }
}
