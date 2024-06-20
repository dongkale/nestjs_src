import { Controller, Get, Inject } from '@nestjs/common';
import { IFindTodosInboundPort } from '@/todo/inbound-port/find-todos.inbound-port.interface';

@Controller()
export class GetTodosController {
  private readonly logger = new Logger(GetTodosController.name);
  constructor(
    @Inject(IFindTodosInboundPort) //modules에서 지정한 토큰
    private readonly findTodosInboundPort: IFindTodosInboundPort,
  ) {}

  @Get('/tosos')
  async handle() {
    // 컨트롤러는 의존성이 주입된 객체를 직접 가지고 컨트롤 하는것이 아니라,
    // 의존된 인터페이스를 가지고 조작한다.
    const result = await this.findTodosInboundPort.execute();

    this.logger.log(`members: ${JSON.stringify(result, null, 2)}`);

    return result;
  }
}
