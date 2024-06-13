import { SendMoneyCommand } from '@/domains/ports/in/send-money.command';

export const SendMoneyUseCaseSymbol = Symbol('SendMoneyUseCase');

export interface SendMoneyUseCase {
  sendMoney(command: SendMoneyCommand): Promise<boolean>;
}
