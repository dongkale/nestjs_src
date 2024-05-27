import {
  IFindMembersInboundPort,
  FindMembersInboundPortInputDto,
  FindMembersInboundPortOutputDto,
} from '@/member/inbound-port/find-members.inbound-port';
import { Inject, Logger } from '@nestjs/common';
import { IFindMembersOutboundPort } from '@/member/outbound-port/find-members.outbound-port';

// InboundPort의 구현체가 바로 서비스!
// 서비스는 들어오는 Port들을 implements하면서 구현 된다.
export class FindMembersService implements IFindMembersInboundPort {
  private readonly logger = new Logger(FindMembersService.name);

  constructor(
    // 서비스는 modules에 FIND_MEMBERS_OUTBOUND_PORT 토큰으로 주입된 객체에 의존한다.
    // 객체대신 그 객체의 인터페이스를 가지고 로직을 구현한다.
    @Inject(IFindMembersOutboundPort)
    private readonly findMembersOutboundPort: IFindMembersOutboundPort, // modules에 FIND_MEMBERS_OUTBOUND_PORT 토큰으로 주입된 객체의 인터페이스
  ) {}

  // 인터페이스로 제공받은 FindMembersInboundPort의 구체화 부분
  // 서비스는 input을 받아 DI로 주입받은 port에 전달해주는 역할만 한다.
  async execute(
    params: FindMembersInboundPortInputDto,
  ): Promise<FindMembersInboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    // 서비스로직에서는 아웃바운드포트에 데이터 전달 만 한다.
    return this.findMembersOutboundPort.execute();
  }
}
