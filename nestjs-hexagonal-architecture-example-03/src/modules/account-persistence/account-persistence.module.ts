import { Global, Module } from '@nestjs/common';
import { AccountPersistenceAdapter } from './account-persistence.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmEntity } from './account.orm-entity';
import { ActivityOrmEntity } from './activity.orm-entity';
import { SendMoneyUseCaseSymbol } from '../../domains/ports/in/send-money.use-case';
import { SendMoneyService } from '../../domains/services/send-money.service';
import { LoadAccountPort } from '@/domains/ports/out/load-account.port';
import { UpdateAccountStatePort } from '@/domains/ports/out/update-account-state.port';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccountOrmEntity, ActivityOrmEntity])],
  providers: [
    AccountPersistenceAdapter,
    {
      provide: SendMoneyUseCaseSymbol,
      useFactory: (
        accountPersistenceAdapter: UpdateAccountStatePort | LoadAccountPort,
      ) => {
        return new SendMoneyService(
          accountPersistenceAdapter as UpdateAccountStatePort,
          accountPersistenceAdapter as LoadAccountPort,
        );
      },
      inject: [AccountPersistenceAdapter],
    },
  ],
  exports: [SendMoneyUseCaseSymbol],
})
export class AccountPersistenceModule {}
