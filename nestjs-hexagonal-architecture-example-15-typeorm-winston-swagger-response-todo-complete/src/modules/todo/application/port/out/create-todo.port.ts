import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';

export interface CreateTodoPort {
  saveTodo(todo: Partial<TodoEntity>): Promise<TodoEntity>;
}
