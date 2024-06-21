import { Controller, Inject, Body, Get, Logger } from '@nestjs/common';
import {
  FindTodoInboundPortInputDto,
  IFindTodoInboundPort,
} from '@/todo/inbound-port/find-todo.inbound-port.interface';
import { ResponseEntity } from '@/libs/response/response.entity';

@Controller()
export class GetTodoController {
  private readonly logger = new Logger(GetTodoController.name);

  constructor(
    @Inject(IFindTodoInboundPort) //modules에서 지정한 토큰
    private readonly findTodoInboundPort: IFindTodoInboundPort,
  ) {}

  @Get('/todo')
  async handle(@Body() findTodo: FindTodoInboundPortInputDto) {
    const result = await this.findTodoInboundPort.execute(findTodo);

    this.logger.log(`result: ${JSON.stringify(result, null, 2)}`);

    // return result;
    return ResponseEntity.Ok(result);
  }
}
