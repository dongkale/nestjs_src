import { TodoEntity } from '@/todo/domains/entities/todo.entity';

export interface GetTodosPort {
  getTodos(): Promise<TodoEntity[]>;
}
