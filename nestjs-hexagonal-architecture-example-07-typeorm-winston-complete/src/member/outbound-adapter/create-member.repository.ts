import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ICreateMemberOutboundPort,
  CreateMemberOutboundPortInputDto,
  CreateMemberOutboundPortOutputDto,
} from '@/member/outbound-port/create-member.outbound-port.interface';

import { MemberEntity } from '@/member/models/member.entity';

export class CreateMembersRepository implements ICreateMemberOutboundPort {
  private readonly logger = new Logger(CreateMembersRepository.name);

  constructor(
    @InjectRepository(MemberEntity)
    private readonly repository: Repository<MemberEntity>,
  ) {}
  async execute(
    params: CreateMemberOutboundPortInputDto,
  ): Promise<CreateMemberOutboundPortOutputDto> {
    this.logger.log(`params: ${JSON.stringify(params, null, 2)}`);

    const create = this.repository.create({ ...params });
    const createdMember = await this.repository.save(create);

    this.logger.log(
      `members_entity: ${JSON.stringify(createdMember, null, 2)}`,
    );

    return {
      name: createdMember.name,
      email: createdMember.email,
      phone: createdMember.phone,
    };
  }
}
