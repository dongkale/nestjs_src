import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';

export interface GetTodoPort {
  getTodo(todoId: TodoId): Promise<TodoEntity>;
}
