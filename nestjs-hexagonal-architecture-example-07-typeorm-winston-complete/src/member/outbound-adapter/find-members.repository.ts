import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IFindMembersOutboundPort,
  FindMembersOutboundPortInputDto,
  FindMembersOutboundPortOutputDto,
} from '@/member/outbound-port/find-members.outbound-port.interface';

// import { Member } from '@/member/models/member.model';
import { MemberEntity } from '@/member/models/member.entity';

// adaptor 는 port 인터페이스의 구현체를 의미한다.
// FindMembersOutboundPort 의 구현체
export class FindMembersRepository implements IFindMembersOutboundPort {
  private readonly logger = new Logger(FindMembersRepository.name);

  constructor(
    @InjectRepository(MemberEntity)
    private readonly repository: Repository<MemberEntity>,
  ) {}
  async execute(
    params: FindMembersOutboundPortInputDto,
  ): Promise<FindMembersOutboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    const members = await this.repository.find();
    this.logger.log(`members_entity: ${JSON.stringify(members, null, 2)}`);

    return members.map((member) => {
      return {
        name: member.name,
        email: member.email,
        phone: member.phone,
      };
    });
  }
}
