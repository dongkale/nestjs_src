import { TodoEntity, TodoId } from '@/domains/entities/todo.entity';

export interface DeleteTodoPort {
  deleteTodo(id: TodoId): Promise<TodoEntity>;
  isExistById(id: TodoId): Promise<boolean>;
}
