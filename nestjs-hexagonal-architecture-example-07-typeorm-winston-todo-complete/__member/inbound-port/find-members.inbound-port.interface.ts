// Dto의 경우 인풋 Dto, 아웃풋 Dto 를 따로 만들어서 각 레이어에 전달한다.
export type FindMembersInboundPortInputDto = void;

export type FindMembersInboundPortOutputDto = Array<{
  name: string;
  email: string;
  phone: string;
}>;

// export const FIND_MEMBERS_INBOUND_PORT = 'FIND_MEMBERS_INBOUND_PORT' as const;

// Inbound 처리는 서비스로직에서 할거다.
// 즉 InboundPort의 구현체는 서비스가 되고, 이것은 서비스 로직에서 사용할 인터페이스인 것이다.
// 서비스 클래스는 InputDto 를 받아서 OutputDto를 반환하는 역할 만 한다.
export interface IFindMembersInboundPort {
  execute(
    params: FindMembersInboundPortInputDto,
  ): Promise<FindMembersInboundPortOutputDto>;
}
export const IFindMembersInboundPort = Symbol('IFindMembersInboundPort');
