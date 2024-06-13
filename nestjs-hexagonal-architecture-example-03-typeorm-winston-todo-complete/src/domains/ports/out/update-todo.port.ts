import { TodoEntity } from '@/domains/entities/todo.entity';

export interface UpdateTodoPort {
  updateTodo(todo: Partial<TodoEntity>): Promise<TodoEntity>;
}
