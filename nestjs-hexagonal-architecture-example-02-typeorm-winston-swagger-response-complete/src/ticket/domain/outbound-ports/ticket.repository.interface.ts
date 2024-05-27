import { Ticket } from '@/ticket/domain/model/ticket';

/**
 * Interface for Ticket Repository, outbound port
 */
export interface ITicketRepository {
  create(ticket: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
}

export const ITicketRepository = Symbol('ITicketRepository');
