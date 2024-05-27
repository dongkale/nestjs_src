import { Inject, Logger } from '@nestjs/common';
import { Ticket } from '@/ticket/domain/model/ticket';
import { ITicketRepository } from '@/ticket/domain/outbound-ports/ticket.repository.interface';
import { ITicketService } from '@/ticket/domain/inboud-ports/ticket.service.interface';

export class TicketService implements ITicketService {
  private readonly logger = new Logger(TicketService.name);
  constructor(
    @Inject(ITicketRepository)
    private readonly tickerRepository: ITicketRepository,
  ) {}

  // async create(
  //   description: string,
  //   priority: number,
  //   status: string,
  // ): Promise<Ticket> {
  //   const ticket = new Ticket(
  //     0,
  //     description,
  //     status,
  //     priority,
  //     new Date(),
  //     new Date(),
  //   );
  //   const find = await this.findActiveTickets();

  //   if (find.length >= 3) {
  //     throw new Error('Ticket count is more than 3');
  //   }
  //   this.tickerRepository.create(ticket);
  //   return ticket;
  // }

  async create(ticket: Ticket): Promise<Ticket> {
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
    return tickets.filter((ticket) => !ticket.isClosed());
  }
}
