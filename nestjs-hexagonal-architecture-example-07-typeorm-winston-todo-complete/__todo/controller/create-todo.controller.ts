import { Controller, Inject, Body, Logger, Post } from '@nestjs/common';

import {
  CreateTodoInboundPortInputDto,
  ICreateTodoInboundPort,
} from '@/todo/inbound-port/create-todo.inbound-port.interface';

@Controller()
export class CreateTodoController {
  private readonly logger = new Logger(CreateTodoController.name);

  constructor(
    @Inject(ICreateTodoInboundPort)
    private readonly createTodoInboundPort: ICreateTodoInboundPort,
  ) {}

  @Post('/todo')
  async handle(@Body() createTodo: CreateTodoInboundPortInputDto) {
    const result = await this.createTodoInboundPort.execute(createTodo);

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    return result;
  }
}
