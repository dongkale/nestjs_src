import { TodoEntity } from '@/todo/domains/entities/todo.entity';

export interface CreateTodoPort {
  saveTodo(todo: Partial<TodoEntity>): Promise<TodoEntity>;
}
