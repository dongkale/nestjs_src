import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../../domain/model/Ticket';
import { ITicketRepository } from '../../domain/outboundPorts/ITicketRepository';
import { TicketEntity } from './TicketEntity';

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
    // this.tickets.push(ticket);
    return ticket;
  }

  async findAll(): Promise<Ticket[]> {
    const tickets = await this.repository.find();

    return tickets.map((ticket) => {
      return new Ticket(
        ticket.id,
        ticket.description,
        ticket.priority,
        ticket.status,
        ticket.createdAt,
        ticket.updatedAt,
      );
    });
  }
}
