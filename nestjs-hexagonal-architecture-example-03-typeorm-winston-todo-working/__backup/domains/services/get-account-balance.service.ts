import { GetAccountBalanceQuery } from '@/domains/ports/in/get-account-balance.query';
import { AccountEntity, AccountId } from '@/domains/entities/account.entity';
import { LoadAccountPort } from '@/domains/ports/out/todo.port';
import { MoneyEntity } from '@/domains/entities/money.entity';

export class GetAccountBalanceService implements GetAccountBalanceQuery {
  constructor(private readonly _loadAccountPort: LoadAccountPort) {}

  async getAccountBalance(accountId: AccountId): Promise<MoneyEntity> {
    const account: AccountEntity =
      await this._loadAccountPort.loadAccount(accountId); // Assign the result of the loadAccount method to account using await to ensure it's a Promise<AccountEntity>.
    if (!account) {
      throw new Error('Account not found');
    }

    return account.calculateBalance();
  }
}
