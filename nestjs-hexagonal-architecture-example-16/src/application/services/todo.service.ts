// src/application/services/todo.service.ts
import { Injectable } from '@nestjs/common';
import { ITodoService } from '../interfaces/itodo.service';
import { ITodoRepository } from '../../domain/ports/itodo.repository';
import { Todo } from '../../domain/entities/todo.entity';

@Injectable()
export class TodoService implements ITodoService {
  constructor(private readonly todoRepository: ITodoRepository) {}

  async getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }

  async getTodoById(id: number): Promise<Todo> {
    return this.todoRepository.findById(id);
  }

  async createTodo(todo: Todo): Promise<Todo> {
    return this.todoRepository.create(todo);
  }

  async updateTodo(id: number, todo: Todo): Promise<Todo> {
    return this.todoRepository.update(id, todo);
  }

  async deleteTodo(id: number): Promise<void> {
    return this.todoRepository.delete(id);
  }
}
