import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@/libs/Transactional';

import { DepositCommand } from '@/account/application/command/DepositCommand';
import { InjectionToken } from '@/account/application/InjectionToken';

import { ErrorMessage } from '@/account/domain/ErrorMessage';
import { AccountRepository } from '@/account/domain/AccountRepository';

@CommandHandler(DepositCommand)
export class DepositHandler implements ICommandHandler<DepositCommand, void> {
  constructor(
    @Inject(InjectionToken.ACCOUNT_REPOSITORY)
    private readonly accountRepository: AccountRepository,
  ) {}

  @Transactional()
  async execute(command: DepositCommand): Promise<void> {
    const account = await this.accountRepository.findById(command.accountId);
    if (!account)
      throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);

    account.deposit(command.amount);

    await this.accountRepository.save(account);

    account.commit();
  }
}
