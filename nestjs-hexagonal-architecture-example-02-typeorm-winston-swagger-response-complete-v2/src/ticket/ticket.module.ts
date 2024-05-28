import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from '@/ticket/adapters/driving/ticket.controller';
import { ITicketService } from '@/ticket/domain/inboud-ports/ticket.service.interface';
import { TicketService } from '@/ticket/domain/inboud-ports/ticket.service';
import { ITicketRepository } from '@/ticket/domain/outbound-ports/ticket.repository.interface';
import { TicketEntity } from '@/ticket/adapters/driven/ticket.entity';
import { TicketInDatabase } from '@/ticket/adapters/driven/ticket.database';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketController],
  providers: [
    // TicketService,
    {
      provide: ITicketService, // domain inbound port
      useClass: TicketService,
    },
    {
      provide: ITicketRepository, // domain outbound port
      useClass: TicketInDatabase,
    },
  ],
})
export class TicketModule {}
