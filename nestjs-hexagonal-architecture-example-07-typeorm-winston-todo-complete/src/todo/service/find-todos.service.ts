import {
  IFindTodosInboundPort,
  FindTodosInboundPortInputDto,
  FindTodosInboundPortOutputDto,
} from '@/todo/inbound-port/find-todos.inbound-port.interface';
import { Inject, Logger } from '@nestjs/common';
import { IFindTodosOutboundPort } from '@/todo/outbound-port/find-todos.outbound-port.interface';

// InboundPort의 구현체가 바로 서비스!
// 서비스는 들어오는 Port들을 implements하면서 구현 된다.
export class FindTodosService implements IFindTodosInboundPort {
  private readonly logger = new Logger(FindTodosService.name);

  constructor(
    @Inject(IFindTodosOutboundPort)
    private readonly findTodosOutboundPort: IFindTodosOutboundPort,
  ) {}

  // 인터페이스로 제공받은 FindTodosInboundPort의 구체화 부분
  // 서비스는 input을 받아 DI로 주입받은 port에 전달해주는 역할만 한다.
  async execute(
    params: FindTodosInboundPortInputDto,
  ): Promise<FindTodosInboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    return this.findTodosOutboundPort.execute();
  }
}
