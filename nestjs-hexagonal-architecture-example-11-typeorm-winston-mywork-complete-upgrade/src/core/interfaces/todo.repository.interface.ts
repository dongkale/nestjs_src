import { Todo } from '@/core/models/todo.model';

export interface ITodoRepository {
  getAll(): Promise<Todo[]>;
  get(id: number): Promise<Todo>;
  create(todo: Todo): Promise<Todo>;
  update(id: number, todo: Partial<Todo>): Promise<Todo>;
  remove(id: number): Promise<Todo>;
}

export const ITodoRepository = Symbol('ITodoRepository');
