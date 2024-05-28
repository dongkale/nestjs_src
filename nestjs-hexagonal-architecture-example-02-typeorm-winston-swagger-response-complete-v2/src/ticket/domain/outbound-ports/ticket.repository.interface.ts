import { Ticket } from '@/ticket/domain/model/ticket';

/**
 * Interface for Ticket Repository, outbound port
 */
export interface ITicketRepository {
  create(ticket: Ticket): Promise<Ticket>;
  update(id: number, ticket: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  findOne(id: number): Promise<Ticket>;
  remove(id: number): Promise<Ticket>;
}

export const ITicketRepository = Symbol('ITicketRepository');
