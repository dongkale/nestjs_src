import { GetAccountBalanceQuery } from '../ports/in/get-account-balance.query';
import { AccountEntity, AccountId } from '../entities/account.entity';
import { LoadAccountPort } from '../ports/out/load-account.port';
import { MoneyEntity } from '../entities/money.entity';

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
