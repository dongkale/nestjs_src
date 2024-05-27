import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from '@/ticket/adapters/driving/TicketController';
import { ITicketService } from '@/ticket/domain/inboudPorts/ITicketService';
import { TicketService } from '@/ticket/domain/inboudPorts/TicketService';
import { ITicketRepository } from '@/ticket/domain/outboundPorts/ITicketRepository';
import { TicketEntity } from '@/ticket/adapters/driven/TicketEntity';
import { TicketInDatabase } from '@/ticket/adapters/driven/TicketInDatabase';

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
