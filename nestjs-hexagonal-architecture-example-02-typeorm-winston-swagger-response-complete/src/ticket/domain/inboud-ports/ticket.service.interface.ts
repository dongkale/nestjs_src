import { Ticket } from '@/ticket/domain/model/ticket';

/**
 * Our domain input port
 */

export interface ITicketService {
  // create(
  //   description: string,
  //   priority: number,
  //   status: string,
  // ): Promise<Ticket>;
  create(ticket: Ticket): Promise<Ticket>;
  findAll(): Promise<Ticket[]>;
  findActiveTickets(): Promise<Ticket[]>;
}
export const ITicketService = Symbol('ITicketService');
