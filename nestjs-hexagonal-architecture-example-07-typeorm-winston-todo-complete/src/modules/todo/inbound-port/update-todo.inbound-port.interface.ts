import { TodoId } from '@/todo/entity/todo.entity';

export type UpdateTodoInboundPortInputDto = {
  id: TodoId;
  title: string;
  content: string;
};

export type UpdateTodoInboundPortOutputDto = {
  id: TodoId;
  title: string;
  content: string;
};

export interface IUpdateTodoInboundPort {
  execute(
    params: UpdateTodoInboundPortInputDto,
  ): Promise<UpdateTodoInboundPortOutputDto>;
}
export const IUpdateTodoInboundPort = Symbol('IUpdateTodoInboundPort');
