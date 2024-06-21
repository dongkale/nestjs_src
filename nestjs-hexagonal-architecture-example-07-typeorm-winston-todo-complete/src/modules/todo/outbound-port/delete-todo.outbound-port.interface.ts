import { TodoId } from '@/todo/entity/todo.entity';

export type DeleteTodoOutboundPortInputDto = {
  id: TodoId;
};

export type DeleteTodoOutboundPortOutputDto = {
  id: TodoId;
  title: string;
  content: string;
};
export interface IDeleteTodoOutboundPort {
  execute(
    params: DeleteTodoOutboundPortInputDto,
  ): Promise<DeleteTodoOutboundPortOutputDto>;
}
export const IDeleteTodoOutboundPort = Symbol('IDeleteTodoOutboundPort');
