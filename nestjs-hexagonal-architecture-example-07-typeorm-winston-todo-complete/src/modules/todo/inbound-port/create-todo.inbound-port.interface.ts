import { TodoId } from '@/todo/entity/todo.entity';

export type CreateTodoInboundPortInputDto = {
  title: string;
  content: string;
};

export type CreateTodoInboundPortOutputDto = {
  id: TodoId;
  title: string;
  content: string;
};

export interface ICreateTodoInboundPort {
  execute(
    params: CreateTodoInboundPortInputDto,
  ): Promise<CreateTodoInboundPortOutputDto>;
}
export const ICreateTodoInboundPort = Symbol('ICreateTodoInboundPort');
