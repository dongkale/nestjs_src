import { Injectable } from '@nestjs/common';
import { Ticket } from '@/ticket/domain/model/ticket.model';
import { TicketService } from '@/ticket/domain/ports/ticket.service';
import { TicketCommand } from '@/ticket/adapters/api/ticket.command';

@Injectable()
export class TicketApiService {
  constructor(private ticketService: TicketService) {}

  create(tickerCommand: TicketCommand): Ticket {
    return this.ticketService.create(
      tickerCommand.description,
      tickerCommand.priority,
    );
  }

  findAll(): Ticket[] {
    return this.ticketService.findAll();
  }
}
