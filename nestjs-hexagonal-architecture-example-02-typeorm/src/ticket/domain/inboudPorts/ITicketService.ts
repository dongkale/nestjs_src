import { Ticket } from '../model/Ticket';

/**
 * Our domain input port
 */

export interface ITicketService {
  create(
    description: string,
    priority: number,
    status: string,
  ): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  findActiveTickets(): Promise<Ticket[]>;
}
