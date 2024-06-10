import { UserCreatedDomainEvent } from '@/modules/user/domain/events/user-created.domain-event';
import { WalletRepositoryPort } from '@/modules/wallet/database/wallet.repository.port';
import { WalletEntity } from '@/modules/wallet/domain/wallet.entity';
import { OnEvent } from '@nestjs/event-emitter';
import { Inject, Injectable } from '@nestjs/common';
import { WALLET_REPOSITORY } from '@/modules/wallet/wallet.di-tokens';

@Injectable()
export class CreateWalletWhenUserIsCreatedDomainEventHandler {
  constructor(
    @Inject(WALLET_REPOSITORY)
    private readonly walletRepo: WalletRepositoryPort,
  ) {}

  // Handle a Domain Event by performing changes to other aggregates (inside the same Domain).
  @OnEvent(UserCreatedDomainEvent.name, { async: true, promisify: true })
  async handle(event: UserCreatedDomainEvent): Promise<any> {
    const wallet = WalletEntity.create({
      userId: event.aggregateId,
    });
    return this.walletRepo.insert(wallet);
  }
}
