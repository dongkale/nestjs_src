import { MoneyEntity } from '@/domains/entities/money.entity';
import { AccountId } from '../../entities/account.entity';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): MoneyEntity;
}
