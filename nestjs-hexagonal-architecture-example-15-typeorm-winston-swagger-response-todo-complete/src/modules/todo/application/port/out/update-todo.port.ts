import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';

export interface UpdateTodoPort {
  updateTodo(todo: Partial<TodoEntity>): Promise<TodoEntity>;
}
