import { Controller, Inject, Body, Logger, Patch } from '@nestjs/common';

import {
  UpdateTodoInboundPortInputDto,
  IUpdateTodoInboundPort,
} from '@/todo/inbound-port/update-todo.inbound-port.interface';
import { ResponseEntity } from '@/libs/response/response.entity';

@Controller()
export class UpdateTodoController {
  private readonly logger = new Logger(UpdateTodoController.name);

  constructor(
    @Inject(IUpdateTodoInboundPort)
    private readonly updateTodoInboundPort: IUpdateTodoInboundPort,
  ) {}

  @Patch('/todo')
  async handle(@Body() updateTodo: UpdateTodoInboundPortInputDto) {
    const result = await this.updateTodoInboundPort.execute(updateTodo);

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    // return result;
    return ResponseEntity.Ok(result);
  }
}
