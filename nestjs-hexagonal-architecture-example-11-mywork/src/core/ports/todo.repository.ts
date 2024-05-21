import { Todo } from '@/core/domain/todo';

export interface TodoRepository {
  save(todo: Todo): Promise<Todo>;
  findById(id: number): Promise<Todo | null>;
  findAll(): Promise<Todo[]>;
  update(id: number, todo: Todo): Promise<void>;
  remove(id: number): Promise<void>;
}
