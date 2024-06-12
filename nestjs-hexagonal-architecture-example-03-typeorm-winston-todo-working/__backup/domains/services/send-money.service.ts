import { LoadAccountPort } from '@/domains/ports/out/todo.port';
import { UpdateAccountStatePort } from '@/domains/ports/out/update-account-state.port';
import { SendMoneyUseCase } from '@/domains/ports/in/todo.use-case';
import { SendMoneyCommand } from '@/domains/ports/in/send-money.command';
import { AccountEntity } from '@/domains/entities/account.entity';

export class SendMoneyService implements SendMoneyUseCase {
  constructor(
    private readonly _loadAccountPort: LoadAccountPort,
    private readonly _updateAccountStatePort: UpdateAccountStatePort,
  ) {}
  async sendMoney(command: SendMoneyCommand) {
    const sourceAccount: AccountEntity =
      await this._loadAccountPort.loadAccount(command.sourceAccountId);
    const targetAccount: AccountEntity =
      await this._loadAccountPort.loadAccount(command.targetAccountId);

    if (!sourceAccount.withdraw(command.money, targetAccount.id)) {
      return false;
    }
    if (!targetAccount.deposite(command.money, sourceAccount.id)) {
      return false;
    }
    this._updateAccountStatePort.updateActivities(sourceAccount);
    this._updateAccountStatePort.updateActivities(targetAccount);

    return true;
  }
}
