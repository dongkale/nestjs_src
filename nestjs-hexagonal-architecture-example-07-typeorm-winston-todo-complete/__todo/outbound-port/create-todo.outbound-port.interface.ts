import { TodoId } from '@/todo/entity/todo.entity';

export type CreateTodoOutboundPortInputDto = {
  title: string;
  content: string;
};

export type CreateTodoOutboundPortOutputDto = {
  id: TodoId;
  title: string;
  content: string;
};
export interface ICreateTodoOutboundPort {
  execute(
    params: CreateTodoOutboundPortInputDto,
  ): Promise<CreateTodoOutboundPortOutputDto>;
}
export const ICreateTodoOutboundPort = Symbol('ICreateTodoOutboundPort');
