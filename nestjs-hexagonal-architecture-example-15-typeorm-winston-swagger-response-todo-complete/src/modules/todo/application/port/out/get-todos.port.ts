import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';

export interface GetTodosPort {
  getTodos(): Promise<TodoEntity[]>;
}
