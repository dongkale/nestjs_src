import { Todo } from '@/core/models/todo.model';

export interface ITodoService {
  getAll(): Promise<Todo[]>;
  get(id: number): Promise<Todo>;
  create(content: string): Promise<Todo>;
  update(id: number, content: string, isDone: boolean): Promise<Todo>;
  remove(id: number): Promise<Todo>;
}

export const ITodoService = Symbol('ITodoService');
