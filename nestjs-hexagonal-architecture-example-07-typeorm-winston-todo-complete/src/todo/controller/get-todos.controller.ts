import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { IFindTodosInboundPort } from '@/todo/inbound-port/find-todos.inbound-port.interface';

@Controller()
export class GetTodosController {
  private readonly logger = new Logger(GetTodosController.name);
  constructor(
    @Inject(IFindTodosInboundPort) //modules에서 지정한 토큰
    private readonly findTodosInboundPort: IFindTodosInboundPort,
  ) {}

  @Get('/todos')
  async handle() {
    const result = await this.findTodosInboundPort.execute();

    this.logger.log(`members: ${JSON.stringify(result, null, 2)}`);

    return result;
  }
}
