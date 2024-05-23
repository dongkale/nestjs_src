import { PrismaClient } from '@prisma/client';
import { RouterNetworkOutputPort } from 'src/application/port/output/router-network.output-port';
import { Router } from 'src/domain/entity/router';
import { RouterId } from 'src/domain/vo/router.id';
import { RouterPrismaMapper } from 'src/framework/adapter/output/prisma/mappers/router-prisma.mapper';
import { prisma } from 'src/framework/adapter/output/prisma/prisma';

class RouterNetworkPrismaAdapter implements RouterNetworkOutputPort {
  constructor(private readonly _prisma: PrismaClient) {}

  async fetchRouterById(routerId: RouterId): Promise<Router> {
    const routerData = await this._prisma.routerData.findFirst({
      where: {
        id: routerId.toString(),
      },
      include: {
        networkSwitch: {
          include: {
            networks: {
              include: {
                ip: true,
              },
            },
            ip: true,
          },
        },
      },
    });

    return RouterPrismaMapper.toDomain(routerData);
  }

  /**
   * 원본 도서 예제의 java는 Router data 전체를 persist 를 사용하는데
   * 실제로 의도한 동작은 input adapter로 부터 전달 받은 network 데이터만 해당 router에 추가하는 동작
   */
  async persistRouter(router: Router): Promise<boolean> {
    const networkData = RouterPrismaMapper.toPrisma(router);

    await this._prisma.networkData.create(networkData);

    return true;
  }
}

export const routerNetworkPrismaAdapter = new RouterNetworkPrismaAdapter(prisma);
