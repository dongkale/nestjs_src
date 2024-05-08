import { Inject, Injectable } from '@nestjs/common';

import {
  EntityIdTransformer,
  ENTITY_ID_TRANSFORMER,
  readConnection,
} from '@/libs/DatabaseModule';

import { AccountEntity } from '@/account/infrastructure/entity/AccountEntity';

import { AccountQuery } from '@/account/application/query/AccountQuery';
import { FindAccountByIdResult } from '@/account/application/query/FindAccountByIdResult';
import { FindAccountsResult } from '@/account/application/query/FindAccountsResult';
import { FindAccountsQuery } from '@/account/application/query/FindAccountsQuery';

@Injectable()
export class AccountQueryImplement implements AccountQuery {
  @Inject(ENTITY_ID_TRANSFORMER)
  private readonly entityIdTransformer: EntityIdTransformer;

  async findById(id: string): Promise<FindAccountByIdResult | null> {
    return readConnection
      .getRepository(AccountEntity)
      .findOneBy({ id: this.entityIdTransformer.to(id) })
      .then((entity) =>
        entity
          ? {
              id: this.entityIdTransformer.from(entity.id),
              name: entity.name,
              balance: entity.balance,
              createdAt: entity.createdAt,
              updatedAt: entity.updatedAt,
              deletedAt: entity.deletedAt,
            }
          : null,
      );
  }

  async find(query: FindAccountsQuery): Promise<FindAccountsResult> {
    return readConnection
      .getRepository(AccountEntity)
      .find({
        skip: query.skip,
        take: query.skip,
      })
      .then((entities) => ({
        accounts: entities.map((entity) => ({
          id: this.entityIdTransformer.from(entity.id),
          name: entity.name,
          balance: entity.balance,
        })),
      }));
  }
}
