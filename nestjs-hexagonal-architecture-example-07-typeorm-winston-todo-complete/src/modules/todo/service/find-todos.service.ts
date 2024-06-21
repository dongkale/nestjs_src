import {
  IFindTodosInboundPort,
  FindTodosInboundPortInputDto,
  FindTodosInboundPortOutputDto,
} from '@/todo/inbound-port/find-todos.inbound-port.interface';
import { Inject, Logger } from '@nestjs/common';
import { IFindTodosOutboundPort } from '@/todo/outbound-port/find-todos.outbound-port.interface';

export class FindTodosService implements IFindTodosInboundPort {
  private readonly logger = new Logger(FindTodosService.name);

  constructor(
    @Inject(IFindTodosOutboundPort)
    private readonly findTodosOutboundPort: IFindTodosOutboundPort,
  ) {}

  async execute(
    params: FindTodosInboundPortInputDto,
  ): Promise<FindTodosInboundPortOutputDto[]> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    return this.findTodosOutboundPort.execute();
  }
}
