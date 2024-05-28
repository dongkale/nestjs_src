import { Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '@/ticket/domain/model/ticket';
import { ITicketRepository } from '@/ticket/domain/outbound-ports/ticket.repository.interface';
import { TicketEntity } from '@/ticket/adapters/driven/ticket.entity';
// import { plainToClass } from 'class-transformer';

export class TicketInDatabase implements ITicketRepository {
  private readonly logger = new Logger(TicketInDatabase.name);
  constructor(
    @InjectRepository(TicketEntity)
    private readonly repository: Repository<TicketEntity>,
  ) {}

  async create(ticket: Ticket): Promise<Ticket> {
    try {
      // const createdTicket = this.repository.create(
      //   ticket.description,
      //   ticket.priority,
      //   ticket.status,
      // );
      const createdTicket = this.repository.create({ ...ticket });
      const savedTicket = await this.repository.save(createdTicket);

      this.logger.log(JSON.stringify(savedTicket, null, 2));

      return new Ticket(
        savedTicket.id,
        savedTicket.description,
        savedTicket.status,
        savedTicket.priority,
        savedTicket.createdAt,
        savedTicket.updatedAt,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findAll(): Promise<Ticket[]> {
    try {
      const tickets = await this.repository.find();
      if (!tickets) {
        return [];
      }

      this.logger.log(JSON.stringify(tickets, null, 2));

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
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Ticket> {
    try {
      const ticket = await this.repository.findOne({ where: { id: id } });
      if (!ticket) {
        throw new NotFoundException(`"${id}" Not Found.`);
      }

      this.logger.log(JSON.stringify(ticket, null, 2));

      return new Ticket(
        ticket.id,
        ticket.description,
        ticket.status,
        ticket.priority,
        ticket.createdAt,
        ticket.updatedAt,
      );
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async remove(id: number): Promise<Ticket> {
    try {
      const ticket = await this.repository.findOne({ where: { id: id } });
      if (!ticket) {
        throw new NotFoundException(`"${id}" Not Found.`);
      }

      const deletedTicket = new Ticket(
        ticket.id,
        ticket.description,
        ticket.status,
        ticket.priority,
        ticket.createdAt,
        ticket.updatedAt,
      );

      this.logger.log(JSON.stringify(deletedTicket, null, 2));

      await this.repository.delete({ id: id });

      return deletedTicket;
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }

  async update(id: number, ticket: Ticket): Promise<Ticket> {
    try {
      const createdTicket = this.repository.create({ ...ticket, id: id });
      await this.repository.update(id, createdTicket);

      const updatedTicket = await this.repository.findOne({ where: { id } });
      if (!updatedTicket) {
        throw new NotFoundException(`"${id}" Not Found.`);
      }

      this.logger.log(JSON.stringify(updatedTicket, null, 2));

      // return plainToClass(Ticket, updatedTicket);

      return new Ticket(
        updatedTicket.id,
        updatedTicket.description,
        updatedTicket.status,
        updatedTicket.priority,
        updatedTicket.createdAt,
        updatedTicket.updatedAt,
      );
    } catch (error) {
      this.logger.debug(error);
      throw error;
    }
  }
}
