import { TodoId } from '@/todo/entity/todo.entity';

export type FindTodosOutboundPortInputDto = void;

export type FindTodosOutboundPortOutputDto = Array<{
  id: TodoId;
  title: string;
  content: string;
}>;
export interface IFindTodosOutboundPort {
  execute(
    params: FindTodosOutboundPortInputDto,
  ): Promise<FindTodosOutboundPortOutputDto>;
}
export const IFindTodosOutboundPort = Symbol('IFindTodosOutboundPort');
