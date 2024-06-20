// Dto의 경우 인풋 Dto, 아웃풋 Dto 를 따로 만들어서 각 레이어에 전달한다.
export type FindTodosInboundPortInputDto = void;

export type FindTodosInboundPortOutputDto = Array<{
  name: string;
  email: string;
  phone: string;
}>;

export interface IFindTodosInboundPort {
  execute(
    params: FindTodosInboundPortInputDto,
  ): Promise<FindTodosInboundPortOutputDto>;
}
export const IFindTodosInboundPort = Symbol('IFindTodosInboundPort');
