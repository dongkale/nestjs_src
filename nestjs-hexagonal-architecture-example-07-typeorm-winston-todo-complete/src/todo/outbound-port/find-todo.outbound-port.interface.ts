import { TodoId } from '@/todo/entity/todo.entity';

export type FindTodoOutboundPortInputDto = {
  id: TodoId;
};

export type FindTodoOutboundPortOutputDto = {
  id: TodoId;
  title: string;
  content: string;
};
export interface IFindTodoOutboundPort {
  execute(
    params: FindTodoOutboundPortInputDto,
  ): Promise<FindTodoOutboundPortOutputDto>;
}
export const IFindTodoOutboundPort = Symbol('IFindTodoOutboundPort');
