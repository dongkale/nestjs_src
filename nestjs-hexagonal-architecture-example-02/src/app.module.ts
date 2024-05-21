import { Module } from '@nestjs/common';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [TicketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
