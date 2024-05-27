import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '@/ticket/domain/model/ticket';
import { ITicketRepository } from '@/ticket/domain/outbound-ports/ticket.repository.interface';
import { TicketEntity } from '@/ticket/adapters/driven/ticket.entity';

export class TicketInDatabase implements ITicketRepository {
  private readonly logger = new Logger(TicketInDatabase.name);
  constructor(
    @InjectRepository(TicketEntity)
    private readonly repository: Repository<TicketEntity>,
  ) {}

  async create(ticket: Ticket): Promise<Ticket> {
    // const createdTicket = this.repository.create(
    //   ticket.description,
    //   ticket.priority,
    //   ticket.status,
    // );
    const createdTicket = this.repository.create(ticket);
    const savedTicket = await this.repository.save(createdTicket);
    return new Ticket(
      savedTicket.id,
      savedTicket.description,
      savedTicket.status,
      savedTicket.priority,
      savedTicket.createdAt,
      savedTicket.updatedAt,
    );
  }

  async findAll(): Promise<Ticket[]> {
    const tickets = await this.repository.find();
    if (!tickets) {
      return [];
    }

    return tickets.map((ticket: TicketEntity) => {
      return new Ticket(
        ticket.id,
        ticket.description,
        ticket.status,
        ticket.priority,
        ticket.createdAt,
        ticket.updatedAt,
      );
    });
  }
}
