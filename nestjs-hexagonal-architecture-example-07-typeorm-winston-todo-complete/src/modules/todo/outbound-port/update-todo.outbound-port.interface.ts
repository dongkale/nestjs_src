import { TodoId } from '@/todo/entity/todo.entity';

export type UpdateTodoOutboundPortInputDto = {
  id: TodoId;
  title: string;
  content: string;
};

// export type UpdateTodoOutboundPortOutputDto = {
//   id: TodoId;
//   title: string;
//   content: string;
// };

export class UpdateTodoOutboundPortOutputDto {
  id: TodoId;
  title: string;
  content: string;
}

export interface IUpdateTodoOutboundPort {
  execute(
    params: UpdateTodoOutboundPortInputDto,
  ): Promise<UpdateTodoOutboundPortOutputDto>;
}
export const IUpdateTodoOutboundPort = Symbol('IUpdateTodoOutboundPort');
