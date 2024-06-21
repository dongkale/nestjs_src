// Dto의 경우 인풋 Dto, 아웃풋 Dto 를 따로 만들어서 각 레이어에 전달한다.
import { TodoId } from '@/todo/entity/todo.entity';

export type DeleteTodoInboundPortInputDto = {
  id: TodoId;
};

export type DeleteTodoInboundPortOutputDto = {
  id: TodoId;
  title: string;
  content: string;
};

export interface IDeleteTodoInboundPort {
  execute(
    params: DeleteTodoInboundPortInputDto,
  ): Promise<DeleteTodoInboundPortOutputDto>;
}
export const IDeleteTodoInboundPort = Symbol('IDeleteTodoInboundPort');
