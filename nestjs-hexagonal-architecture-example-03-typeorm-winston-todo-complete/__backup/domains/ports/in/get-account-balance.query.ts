import { MoneyEntity } from '@/domains/entities/money.entity';
import { AccountId } from '@/domains/entities/account.entity';

export interface GetAccountBalanceQuery {
  getAccountBalance(accountId: AccountId): Promise<MoneyEntity>;
}
