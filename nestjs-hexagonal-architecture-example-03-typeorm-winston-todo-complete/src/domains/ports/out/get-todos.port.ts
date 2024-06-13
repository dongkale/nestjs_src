import { TodoEntity } from '@/domains/entities/todo.entity';

export interface GetTodosPort {
  getTodos(): Promise<TodoEntity[]>;
}
