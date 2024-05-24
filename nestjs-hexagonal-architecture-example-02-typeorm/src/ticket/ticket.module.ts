import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './adapters/driving/TicketController';
import { TicketService } from './domain/inboudPorts/TicketService';
import { ITicketRepository } from './domain/outboundPorts/ITicketRepository';
// import { TicketInMemory } from './adapters/driven/TicketInMemory';
import { TicketEntity } from '@/ticket/adapters/driven/TicketEntity';
import { TicketInDatabase } from '@/ticket/adapters/driven/TicketInDatabase';

@Module({
  imports: [TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketController],
  providers: [
    TicketService,
    {
      provide: ITicketRepository,
      useClass: TicketInDatabase, // can add condition on ENV, inject mock impl for unit testing
    },
  ],
})
export class TicketModule {}
