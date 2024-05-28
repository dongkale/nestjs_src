import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Logger,
  Inject,
  Res,
  HttpStatus,
  Delete,
  Param,
} from '@nestjs/common';
import { ITicketService } from '@/ticket/domain/inboud-ports/ticket.service.interface';
import { TicketService } from '@/ticket/domain/inboud-ports/ticket.service';
import { CreateTicketDto } from '@/ticket/adapters/model/create-ticket.dto';
import { Ticket } from '@/ticket/domain/model/ticket';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ResponseDto,
  ResponseStatus,
  ResponseMessage,
} from '@/commons/response/response.dto';
import { Response } from 'express';
import { UpdateTicketDto } from '@/ticket/adapters/model/update-ticket.dto';

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

    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseDto(ResponseStatus.OK, ResponseMessage.SUCCESS, tickets),
      );

    // return tickets
  }

  @ApiOperation({
    summary: 'Get One tickets',
    description: '지정 티켓을 가져온다.',
  })
  @ApiResponse({
    status: 200,
    description: '지정 티켓 정보',
    type: ResponseDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const ticket = await this.ticketService.findOne(id);

    this.logger.log(JSON.stringify(ticket, null, 2));

    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseDto(ResponseStatus.OK, ResponseMessage.SUCCESS, ticket),
      );
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
  async create(@Body() createTicketDto: CreateTicketDto, @Res() res: Response) {
    const ticket = new Ticket(
      0,
      createTicketDto.description,
      createTicketDto.status,
      createTicketDto.priority,
      new Date(),
      new Date(),
    );

    const createdTicket = await this.ticketService.create(ticket);

    this.logger.log(JSON.stringify(createdTicket, null, 2));

    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseDto(
          ResponseStatus.OK,
          ResponseMessage.SUCCESS,
          createdTicket,
        ),
      );
    // return { ...createdTicket };
  }

  @ApiOperation({ summary: 'Delete Ticket', description: '티켓을 삭제한다.' })
  @ApiResponse({
    status: 200,
    description: '삭제된 티켓 정보',
    type: Ticket,
  })
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const deleteTicket = await this.ticketService.remove(id);

    this.logger.log(JSON.stringify(deleteTicket, null, 2));

    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseDto(
          ResponseStatus.OK,
          ResponseMessage.SUCCESS,
          deleteTicket,
        ),
      );
  }

  @ApiOperation({ summary: 'Update Ticket', description: '티켓을 수정한다.' })
  @ApiResponse({
    status: 200,
    description: '수정된 티켓 정보',
    type: Ticket,
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTicketDto: UpdateTicketDto,
    @Res() res: Response,
  ) {
    const ticket = new Ticket(
      id,
      updateTicketDto.description,
      updateTicketDto.status,
      updateTicketDto.priority,
    );

    const updateTicket = await this.ticketService.update(id, ticket);

    this.logger.log(JSON.stringify(updateTicket, null, 2));

    return res
      .status(HttpStatus.OK)
      .json(
        new ResponseDto(
          ResponseStatus.OK,
          ResponseMessage.SUCCESS,
          updateTicket,
        ),
      );
  }
}
