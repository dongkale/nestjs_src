import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from '../../domain/inboudPorts/TicketService';
import { TicketCommand } from '../model/TicketCommand';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  async findAll() {
    const tickets = await this.ticketService.findAll();
    return tickets;
  }

  @Post()
  create(@Body() ticketCommand: TicketCommand) {
    const ticker = this.ticketService.create(
      ticketCommand.description,
      ticketCommand.priority,
      ticketCommand.status,
    );
    // this.logger.debug(ticketCommand);
    // this.logger.debug({ ticker });
    return { ...ticker };
  }
}
