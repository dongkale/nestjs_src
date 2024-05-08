import { addYears } from 'date-fns/addYears';
import { LessThan } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Inject, Logger, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PasswordModule } from '@/libs/PasswordModule';
import {
  EntityIdTransformer,
  ENTITY_ID_TRANSFORMER,
  writeConnection,
} from '@/libs/DatabaseModule';
import { TaskPublisher, TASK_PUBLISHER } from '@/libs/MessageModule';

import { AccountQueryImplement } from '@/account/infrastructure/query/AccountQueryImplement';
import { AccountRepositoryImplement } from '@/account/infrastructure/repository/AccountRepositoryImplement';
import { AccountEntity } from '@/account/infrastructure/entity/AccountEntity';

import { AccountsController } from '@/account/interface/AccountsController';
import { AccountTaskController } from '@/account/interface/AccountTaskController';

import { CloseAccountHandler } from '@/account/application/command/CloseAccountHandler';
import { DepositHandler } from '@/account/application/command/DepositHandler';
import { OpenAccountHandler } from '@/account/application/command/OpenAccountHandler';
import { RemitHandler } from '@/account/application/command/RemitHandler';
import { UpdatePasswordHandler } from '@/account/application/command/UpdatePasswordHandler';
import { WithdrawHandler } from '@/account/application/command/WithdrawHandler';
import { FindAccountByIdHandler } from '@/account/application/query/FindAccountByIdHandler';
import { FindAccountsHandler } from '@/account/application/query/FindAccountsHandler';
import { InjectionToken } from '@/account/application/InjectionToken';
import { AccountOpenedHandler } from '@/account/application/event/AccountOpenedHandler';
import { LockAccountCommand } from '@/account/application/command/LockAccountCommand';
import { LockAccountHandler } from '@/account/application/command/LockAccountHandler';
import { PasswordUpdatedHandler } from '@/account/application/event/PasswordUpdatedHandler';
import { AccountClosedHandler } from '@/account/application/event/AccountClosedHandler';
import { DepositedHandler } from '@/account/application/event/DepositedHandler';
import { WithdrawnHandler } from '@/account/application/event/WithdrawnHandler';

import { AccountDomainService } from '@/account/domain/AccountDomainService';
import { AccountFactory } from '@/account/domain/AccountFactory';

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.ACCOUNT_REPOSITORY,
    useClass: AccountRepositoryImplement,
  },
  {
    provide: InjectionToken.ACCOUNT_QUERY,
    useClass: AccountQueryImplement,
  },
];

const application = [
  CloseAccountHandler,
  DepositHandler,
  OpenAccountHandler,
  RemitHandler,
  UpdatePasswordHandler,
  WithdrawHandler,
  FindAccountByIdHandler,
  FindAccountsHandler,
  AccountOpenedHandler,
  LockAccountHandler,
  PasswordUpdatedHandler,
  AccountClosedHandler,
  DepositedHandler,
  WithdrawnHandler,
];

const domain = [AccountDomainService, AccountFactory];

@Module({
  imports: [CqrsModule, PasswordModule],
  controllers: [AccountsController, AccountTaskController],
  providers: [Logger, ...infrastructure, ...application, ...domain],
})
export class AccountsModule {
  @Inject(TASK_PUBLISHER) private readonly taskPublisher: TaskPublisher;
  @Inject(ENTITY_ID_TRANSFORMER)
  private readonly entityIdTransformer: EntityIdTransformer;

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async lockUnusedAccount(): Promise<void> {
    (
      await writeConnection.manager
        .getRepository(AccountEntity)
        .findBy({ updatedAt: LessThan(addYears(new Date(), -1)) })
    ).forEach((account) =>
      this.taskPublisher.publish(
        LockAccountCommand.name,
        new LockAccountCommand(this.entityIdTransformer.from(account.id)),
      ),
    );
  }
}
