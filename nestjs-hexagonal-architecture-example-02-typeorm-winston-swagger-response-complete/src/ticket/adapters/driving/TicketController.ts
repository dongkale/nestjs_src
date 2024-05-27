import {
  Body,
  Controller,
  Get,
  Post,
  Logger,
  Inject,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ITicketService } from '@/ticket/domain/inboudPorts/ITicketService';
import { TicketService } from '@/ticket/domain/inboudPorts/TicketService';
import { TicketCommand } from '@/ticket/adapters/model/TicketCommand';
import { Ticket } from '@/ticket/domain/model/Ticket';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '@/commons/response/response.dto';
import { Response } from 'express';

@ApiTags('ticket API')
@Controller('ticket')
export class TicketController {
  private readonly logger = new Logger(TicketController.name);

  constructor(@Inject(ITicketService) private ticketService: TicketService) {}
  // ticket.module.ts 에서
  // {
  //   provide: ITicketService,
  //   useClass: TicketService,
  // },
  // 이렇게 셋팅해주었기 때문에 @Inject(ITicketService)로 주입받을 수 있다.
  // TicketService
  // 이런식으로 넣었다면  private ticketService: TicketService 로 주입받아야 한다.

  @ApiOperation({
    summary: 'Get All tickets',
    description: '모든 티켓을 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: '모든 티켓 정보',
    type: ResponseDto,
  })
  @Get()
  async findAll(@Res() res: Response) {
    const tickets = await this.ticketService.findAll();

    this.logger.log(JSON.stringify(tickets, null, 2));
    // return tickets;

    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'successfully', tickets));
  }

  // @Post()
  // async create(@Body() ticketCommand: TicketCommand) {
  //   const ticker = await this.ticketService.create(
  //     ticketCommand.description,
  //     ticketCommand.priority,
  //     ticketCommand.status,
  //   );
  //   // this.logger.debug(ticketCommand);
  //   // this.logger.debug({ ticker });

  //   this.logger.log(JSON.stringify(ticker, null, 2));

  //   return { ...ticker };
  // }

  @ApiOperation({ summary: 'Create ticket', description: '티켓을 생성한다.' })
  @ApiResponse({
    status: 200,
    description: '생성된 티켓 정보',
    type: Ticket,
  })
  @Post()
  async create(@Body() ticketCommand: TicketCommand, @Res() res: Response) {
    const ticket = new Ticket(
      0,
      ticketCommand.description,
      ticketCommand.status,
      ticketCommand.priority,
      new Date(),
      new Date(),
    );

    const createdTicket = await this.ticketService.create(ticket);
    // this.logger.debug(ticketCommand);
    // this.logger.debug({ ticker });

    this.logger.log(JSON.stringify(createdTicket, null, 2));

    // return { ...createdTicket };
    return res
      .status(HttpStatus.OK)
      .json(new ResponseDto('success', 'successfully', createdTicket));
  }
}
