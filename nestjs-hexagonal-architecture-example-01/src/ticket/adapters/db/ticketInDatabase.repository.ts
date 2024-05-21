import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from '@/ticket/domain/model/ticket.model';
import { TicketRepository } from '@/ticket/domain/ports/ticket.repository';
import { TicketEntity } from '@/ticket/domain/model/ticket.entity';

@Injectable()
export class TicketInDataBase implements TicketRepository {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}
  // private readonly tickets: Ticket[] = [];

  // create(ticket: Ticket): Ticket {
  //   // this.tickets.push(ticket);
  //   return this.taskRepository.save({ description });
  //   // return ticket;
  // }

  async findAll(): Promise<TicketEntity[]> {
    return this.ticketRepository.find();
  }
}
