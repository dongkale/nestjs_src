import { Todo } from '@/core/domain/todo.entity';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findOne(id: string): Promise<Todo>;
  create(todo: Todo): Promise<Todo>;
  update(id: string, todo: Todo): Promise<void>;
  delete(id: string): Promise<void>;
}
