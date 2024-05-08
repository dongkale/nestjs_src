import { Inject, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { Transactional } from '@/libs/Transactional';

import { CloseAccountCommand } from '@/account/application/command/CloseAccountCommand';
import { InjectionToken } from '@/account/application/InjectionToken';

import { ErrorMessage } from '@/account/domain/ErrorMessage';
import { AccountRepository } from '@/account/domain/AccountRepository';

@CommandHandler(CloseAccountCommand)
export class CloseAccountHandler
  implements ICommandHandler<CloseAccountCommand, void>
{
  @Inject(InjectionToken.ACCOUNT_REPOSITORY)
  private readonly accountRepository: AccountRepository;

  @Transactional()
  async execute(command: CloseAccountCommand): Promise<void> {
    const account = await this.accountRepository.findById(command.accountId);
    if (!account)
      throw new NotFoundException(ErrorMessage.ACCOUNT_IS_NOT_FOUND);

    account.close();

    await this.accountRepository.save(account);

    account.commit();
  }
}
