import { IEvent } from '@nestjs/cqrs';

export class AccountTransferredEvent implements IEvent {
  constructor(
    public readonly fromAccountId: string,
    public readonly toAccountId: string,
    public readonly amount: string,
  ) {}
}
