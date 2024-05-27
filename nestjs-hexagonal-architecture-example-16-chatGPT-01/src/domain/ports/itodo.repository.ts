// src/domain/ports/itodo.repository.ts
import { Todo } from '../entities/todo.entity';

export interface ITodoRepository {
  findAll(): Promise<Todo[]>;
  findById(id: number): Promise<Todo>;
  create(todo: Todo): Promise<Todo>;
  update(id: number, todo: Todo): Promise<Todo>;
  delete(id: number): Promise<void>;
}

export const ITodoRepository = Symbol('ITodoRepository');
