import {
  IFindTodoInboundPort,
  FindTodoInboundPortInputDto,
  FindTodoInboundPortOutputDto,
} from '@/todo/inbound-port/find-todo.inbound-port.interface';
import { Inject, Logger } from '@nestjs/common';
import { IFindTodoOutboundPort } from '@/todo/outbound-port/find-todo.outbound-port.interface';

export class FindTodoService implements IFindTodoInboundPort {
  private readonly logger = new Logger(FindTodoService.name);

  constructor(
    @Inject(IFindTodoOutboundPort)
    private readonly findTodoOutboundPort: IFindTodoOutboundPort,
  ) {}

  async execute(
    params: FindTodoInboundPortInputDto,
  ): Promise<FindTodoInboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    return this.findTodoOutboundPort.execute(params);
  }
}
