import {
  IDeleteTodoInboundPort,
  DeleteTodoInboundPortInputDto,
  DeleteTodoInboundPortOutputDto,
} from '@/todo/inbound-port/delete-todo.inbound-port.interface';
import { Inject, Logger } from '@nestjs/common';
import { IDeleteTodoOutboundPort } from '@/todo/outbound-port/delete-todo.outbound-port.interface';

export class DeleteTodoService implements IDeleteTodoInboundPort {
  private readonly logger = new Logger(DeleteTodoService.name);

  constructor(
    @Inject(IDeleteTodoOutboundPort)
    private readonly deleteTodoOutboundPort: IDeleteTodoOutboundPort,
  ) {}

  async execute(
    params: DeleteTodoInboundPortInputDto,
  ): Promise<DeleteTodoInboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    return this.deleteTodoOutboundPort.execute(params);
  }
}
