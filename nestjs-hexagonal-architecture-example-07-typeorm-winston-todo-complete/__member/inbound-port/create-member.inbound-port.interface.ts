export type CreateMemberInboundPortInputDto = {
  name: string;
  email: string;
  phone: string;
};

export type CreateMemberInboundPortOutputDto = {
  name: string;
  email: string;
  phone: string;
};

export interface ICreateMemberInboundPort {
  execute(
    params: CreateMemberInboundPortInputDto,
  ): Promise<CreateMemberInboundPortOutputDto>;
}
export const ICreateMemberInboundPort = Symbol('ICreateMemberInboundPort');
