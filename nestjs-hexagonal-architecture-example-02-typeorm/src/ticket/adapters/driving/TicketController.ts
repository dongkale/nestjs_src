import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketService } from '../../domain/inboudPorts/TicketService';

import { TicketCommand } from '../model/TicketCommand';

@Controller('ticket')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Get()
  findAll(): any[] {
    return this.ticketService.findAll();
  }

  @Post()
  create(@Body() ticketCommand: TicketCommand): any {
    const ticker = this.ticketService.create(
      ticketCommand.description,
      ticketCommand.priority,
    );
    // this.logger.debug(ticketCommand);
    // this.logger.debug({ ticker });
    return { ...ticker };
  }
}
