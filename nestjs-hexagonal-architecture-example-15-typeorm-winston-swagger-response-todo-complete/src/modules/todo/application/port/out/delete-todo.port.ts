import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';

export interface DeleteTodoPort {
  deleteTodo(id: TodoId): Promise<TodoEntity>;
  isExistById(id: TodoId): Promise<boolean>;
}
