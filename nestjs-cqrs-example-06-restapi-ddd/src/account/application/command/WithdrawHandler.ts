import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@/libs/Transactional';

import { WithdrawCommand } from '@/account/application/command/WithdrawCommand';
import { InjectionToken } from '@/account/application/InjectionToken';

import { ErrorMessage } from '@/account/domain/ErrorMessage';
import { AccountRepository } from '@/account/domain/AccountRepository';

@CommandHandler(WithdrawCommand)
export class WithdrawHandler implements ICommandHandler<WithdrawCommand, void> {
  @Inject(InjectionToken.ACCOUNT_REPOSITORY)
  private readonly accountRepository: AccountRepository;

  @Transactional()
  async execute(command: WithdrawCommand): Promise<void> {
    const account = await this.accountRepository.findById(command.accountId);
    if (!account)
      throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);

    account.withdraw(command.amount);

    await this.accountRepository.save(account);

    account.commit();
  }
}
