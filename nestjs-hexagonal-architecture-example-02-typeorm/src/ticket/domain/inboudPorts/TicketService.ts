import { Inject, Injectable } from '@nestjs/common';
import { Ticket } from '../model/Ticket';
import { ITicketRepository } from '../outboundPorts/ITicketRepository';
import { ITicketService } from './ITicketService';

/**
 * The implementation of the inbound port ITicketService.
 */
@Injectable()
export class TicketService implements ITicketService {
  constructor(
    @Inject(ITicketRepository)
    private readonly tickerRepository: ITicketRepository,
  ) {}

  async create(
    description: string,
    priority: number,
    status: string,
  ): Promise<Ticket> {
    const ticket = new Ticket(
      0,
      description,
      status,
      priority,
      new Date(),
      new Date(),
    );
    const find = await this.findActiveTickets();

    if (find.length >= 3) {
      throw new Error('Ticket count is more than 3');
    }
    this.tickerRepository.create(ticket);
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    const tickets = await this.tickerRepository.findAll();
    return tickets.map(
      (ticket) =>
        new Ticket(
          ticket.id,
          ticket.description,
          ticket.status,
          ticket.priority,
          ticket.createAt,
          ticket.updateAt,
        ),
    );
  }

  async findActiveTickets(): Promise<Ticket[]> {
    const tickets = await this.tickerRepository.findAll();
    return tickets.filter((ticket) => !ticket.isClosed);
  }
}
