// src/application/interfaces/itodo.service.ts
import { Todo } from '@/domain/entities/todo.entity';

export interface ITodoService {
  getAllTodos(): Promise<Todo[]>;
  getTodoById(id: number): Promise<Todo>;
  createTodo(todo: Todo): Promise<Todo>;
  updateTodo(id: number, todo: Todo): Promise<Todo>;
  deleteTodo(id: number): Promise<void>;
}

export const ITodoService = Symbol('ITodoService');
