import {
  IUpdateTodoInboundPort,
  UpdateTodoInboundPortInputDto,
  UpdateTodoInboundPortOutputDto,
} from '@/todo/inbound-port/update-todo.inbound-port.interface';
import { Inject, Logger } from '@nestjs/common';
import { IUpdateTodoOutboundPort } from '@/todo/outbound-port/update-todo.outbound-port.interface';

export class UpdateTodoService implements IUpdateTodoInboundPort {
  private readonly logger = new Logger(UpdateTodoService.name);

  constructor(
    @Inject(IUpdateTodoOutboundPort)
    private readonly updateTodoOutboundPort: IUpdateTodoOutboundPort,
  ) {}

  async execute(
    params: UpdateTodoInboundPortInputDto,
  ): Promise<UpdateTodoInboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    return this.updateTodoOutboundPort.execute(params);
  }
}
