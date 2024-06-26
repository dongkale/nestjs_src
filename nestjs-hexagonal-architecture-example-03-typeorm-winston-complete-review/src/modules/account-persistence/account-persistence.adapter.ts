import { Injectable } from '@nestjs/common';
import { LoadAccountPort } from '@/domains/ports/out/load-account.port';
import { UpdateAccountStatePort } from '@/domains/ports/out/update-account-state.port';
import { AccountEntity, AccountId } from '@/domains/entities/account.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountOrmEntity } from '@/modules/account-persistence/account.orm-entity';
import { Repository } from 'typeorm';
import { ActivityOrmEntity } from '@/modules/account-persistence/activity.orm-entity';
import { AccountMapper } from '@/modules/account-persistence/account.mapper';
import { ActivityEntity } from '@/domains/entities/activity.entity';

@Injectable()
export class AccountPersistenceAdapter
  implements LoadAccountPort, UpdateAccountStatePort
{
  constructor(
    @InjectRepository(AccountOrmEntity)
    private readonly accountRepository: Repository<AccountOrmEntity>,
    @InjectRepository(ActivityOrmEntity)
    private readonly activityRepository: Repository<ActivityOrmEntity>,
  ) {}

  async loadAccount(accountId: AccountId): Promise<AccountEntity> {
    const account: AccountOrmEntity | null =
      await this.accountRepository.findOne({
        where: { userId: accountId },
      });
    if (!account) {
      throw new Error('Account not found');
    }
    const activities = await this.activityRepository.find({
      where: { ownerAccountId: accountId },
    });

    return AccountMapper.mapToDomain(account, activities);
  }
  async updateActivities(account: AccountEntity) {
    account.activityWindow.activities.forEach((activity: ActivityEntity) => {
      if (activity.id === null) {
        this.activityRepository.save(
          AccountMapper.mapToActivityOrmEntity(activity),
        );
      }
    });
  }
}
