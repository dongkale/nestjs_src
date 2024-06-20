import {
  ICreateMemberInboundPort,
  CreateMemberInboundPortInputDto,
  CreateMemberInboundPortOutputDto,
} from '@/__member/inbound-port/create-member.inbound-port.interface';
import { Inject, Logger } from '@nestjs/common';
import { ICreateMemberOutboundPort } from '@/__member/outbound-port/create-member.outbound-port.interface';

export class CreateMemberService implements ICreateMemberInboundPort {
  private readonly logger = new Logger(CreateMemberService.name);

  constructor(
    // 서비스는 modules에 FIND_MEMBERS_OUTBOUND_PORT 토큰으로 주입된 객체에 의존한다.
    // 객체대신 그 객체의 인터페이스를 가지고 로직을 구현한다.
    @Inject(ICreateMemberOutboundPort)
    private readonly createMemberOutboundPort: ICreateMemberOutboundPort, // modules에 FIND_MEMBERS_OUTBOUND_PORT 토큰으로 주입된 객체의 인터페이스
  ) {}

  // 인터페이스로 제공받은 FindMembersInboundPort의 구체화 부분
  // 서비스는 input을 받아 DI로 주입받은 port에 전달해주는 역할만 한다.
  async execute(
    params: CreateMemberInboundPortInputDto,
  ): Promise<CreateMemberInboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    // 서비스로직에서는 아웃바운드포트에 데이터 전달 만 한다.
    return this.createMemberOutboundPort.execute(params);
  }
}
