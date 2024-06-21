// Dto의 경우 인풋 Dto, 아웃풋 Dto 를 따로 만들어서 각 레이어에 전달한다.
import { TodoId } from '@/todo/entity/todo.entity';

export type FindTodosInboundPortInputDto = void;

// export type FindTodosInboundPortOutputDto = Array<{
//   id: TodoId;
//   title: string;
//   content: string;
// }>;

export class FindTodosInboundPortOutputDto {
  id: TodoId;
  title: string;
  content: string;
}

export interface IFindTodosInboundPort {
  execute(
    params: FindTodosInboundPortInputDto,
  ): Promise<FindTodosInboundPortOutputDto[]>;
}
export const IFindTodosInboundPort = Symbol('IFindTodosInboundPort');
