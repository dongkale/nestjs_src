import {
  ICreateTodoInboundPort,
  CreateTodoInboundPortInputDto,
  CreateTodoInboundPortOutputDto,
} from '@/todo/inbound-port/create-todo.inbound-port.interface';
import { Inject, Logger } from '@nestjs/common';
import { ICreateTodoOutboundPort } from '@/todo/outbound-port/create-todo.outbound-port.interface';

// InboundPort의 구현체가 바로 서비스!
// 서비스는 들어오는 Port들을 implements하면서 구현 된다.
export class CreateTodoService implements ICreateTodoInboundPort {
  private readonly logger = new Logger(CreateTodoService.name);

  constructor(
    @Inject(ICreateTodoOutboundPort)
    private readonly createTodoOutboundPort: ICreateTodoOutboundPort,
  ) {}

  // 인터페이스로 제공받은 FindTodosInboundPort의 구체화 부분
  // 서비스는 input을 받아 DI로 주입받은 port에 전달해주는 역할만 한다.
  async execute(
    params: CreateTodoInboundPortInputDto,
  ): Promise<CreateTodoInboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    return this.createTodoOutboundPort.execute(params);
  }
}
