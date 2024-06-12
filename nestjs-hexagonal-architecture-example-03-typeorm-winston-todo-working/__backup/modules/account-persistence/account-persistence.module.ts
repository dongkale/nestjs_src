import { Global, Module } from '@nestjs/common';
import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity } from '@/modules/account-persistence/account.orm-entity';
import { ActivityOrmEntity } from '@/modules/account-persistence/activity.orm-entity';
import { SendMoneyUseCaseSymbol } from '@/domains/ports/in/todo.use-case';
import { SendMoneyService } from '@/domains/services/send-money.service';
import { LoadAccountPort } from '@/domains/ports/out/todo.port';
import { UpdateAccountStatePort } from '@/domains/ports/out/update-account-state.port';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity, ActivityOrmEntity])],
  providers: [
    AccountPersistenceAdapter,
    {
      provide: SendMoneyUseCaseSymbol,
      useFactory: (
        accountPersistenceAdapter: LoadAccountPort | UpdateAccountStatePort,
      ) => {
        return new SendMoneyService(
          accountPersistenceAdapter as LoadAccountPort,
          accountPersistenceAdapter as UpdateAccountStatePort,
        );
      },
      inject: [AccountPersistenceAdapter],
    },
  ],
  exports: [SendMoneyUseCaseSymbol],
})
export class AccountPersistenceModule {}
