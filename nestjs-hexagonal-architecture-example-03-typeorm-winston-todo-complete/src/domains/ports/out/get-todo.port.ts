import { TodoId, TodoEntity } from '@/domains/entities/todo.entity';

export interface GetTodoPort {
  getTodos(): Promise<TodoEntity[]>;
  getTodo(todoId: TodoId): Promise<TodoEntity>;
}
