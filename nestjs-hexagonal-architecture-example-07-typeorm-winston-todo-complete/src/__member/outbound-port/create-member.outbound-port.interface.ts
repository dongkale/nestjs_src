export type CreateMemberOutboundPortInputDto = {
  name: string;
  email: string;
  phone: string;
};

export type CreateMemberOutboundPortOutputDto = {
  name: string;
  email: string;
  phone: string;
};

export interface ICreateMemberOutboundPort {
  execute(
    params: CreateMemberOutboundPortInputDto,
  ): Promise<CreateMemberOutboundPortOutputDto>;
}

export const ICreateMemberOutboundPort = Symbol('ICreateMemberOutboundPort');
