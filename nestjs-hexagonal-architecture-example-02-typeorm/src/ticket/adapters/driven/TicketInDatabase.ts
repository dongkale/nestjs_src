import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '@/ticket/domain/model/Ticket';
import { ITicketRepository } from '@/ticket/domain/outboundPorts/ITicketRepository';
import { TicketEntity } from '@/ticket/adapters/driven/TicketEntity';

/**
 * This is the implementation of output port, to store things in database.
 */
@Injectable()
export class TicketInDatabase implements ITicketRepository {
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
