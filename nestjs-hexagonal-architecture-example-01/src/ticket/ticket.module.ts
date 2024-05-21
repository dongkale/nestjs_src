import { Module } from '@nestjs/common';
import { TicketController } from '@/ticket/adapters/api/ticket.controller';
import { TicketApiService } from '@/ticket/adapters/api/ticketApi.service';
import { TicketRepository } from '@/ticket/domain/ports/ticket.repository';
import { TicketInMemory } from '@/ticket/adapters/db/ticketInMemory.repository';
import { TicketService } from '@/ticket/domain/ports/ticket.service';

@Module({
  imports: [
    /* TypeOrmModule.forFeature([TiacketEntity]) */
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
    TicketApiService,
    {
      provide: TicketRepository,
      useClass: TicketInMemory, // can add condition on ENV, inject mock impl for unit testing
    },
  ],
})
export class TicketModule {}
