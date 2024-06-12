import { Module } from '@nestjs/common';
import { SendMoneyController } from '@/modules/account-web/send-money.controller';

@Module({
  controllers: [SendMoneyController],
})
export class AccountWebModule {}
