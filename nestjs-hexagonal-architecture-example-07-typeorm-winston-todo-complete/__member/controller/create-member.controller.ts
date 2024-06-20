import { Body, Controller, Inject, Logger, Post } from '@nestjs/common';

import {
  CreateMemberInboundPortInputDto,
  ICreateMemberInboundPort,
} from '@/__member/inbound-port/create-member.inbound-port.interface';

@Controller()
export class GreateMemberController {
  private readonly logger = new Logger(GreateMemberController.name);

  constructor(
    @Inject(ICreateMemberInboundPort)
    private readonly createMemberInboundPort: ICreateMemberInboundPort,
  ) {}

  @Post('/members')
  async handle(@Body() createMember: CreateMemberInboundPortInputDto) {
    const result = await this.createMemberInboundPort.execute(createMember);

    this.logger.log(`members: ${JSON.stringify(result, null, 2)}`);

    return result;
  }
}
