import { Prisma } from '@prisma/client';

export type RouterDataType = Prisma.RouterDataGetPayload<{
  include: { networkSwitch: { include: { ip: true; networks: { include: { ip: true } } } } };
}>;

export type NetworkDataType = Prisma.NetworkDataGetPayload<{ include: { ip: true } }>;
