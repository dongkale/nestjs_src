import { Controller, Inject, Body, Delete, Logger } from '@nestjs/common';
import {
  DeleteTodoInboundPortInputDto,
  IDeleteTodoInboundPort,
} from '@/todo/inbound-port/delete-todo.inbound-port.interface';

@Controller()
export class DeleteTodoController {
  private readonly logger = new Logger(DeleteTodoController.name);

  constructor(
    @Inject(IDeleteTodoInboundPort)
    private readonly deleteTodoInboundPort: IDeleteTodoInboundPort,
  ) {}

  @Delete('/todo')
  async handle(@Body() deleteTodo: DeleteTodoInboundPortInputDto) {
    const result = await this.deleteTodoInboundPort.execute(deleteTodo);

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    return result;
  }
}
