// src/core/services/TodoService.ts
import { Inject, Injectable } from '@nestjs/common';
import { TodoRepository } from '@/core/ports/todo.repository';
import { Todo } from '@/core/domain/todo';
import { TodoEntity } from '@/infrastructure/adapters/persistence/entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @Inject('TodoRepository') private todoRepository: TodoRepository,
  ) {}

  // async createTodo(content: string): Promise<Todo> {
  //   const todo = new Todo(0, content, false, new Date(), new Date());
  //   return await this.todoRepository.save(todo);
  // }

  // async getTodo(id: number): Promise<Todo | null> {
  //   return await this.todoRepository.findById(id);
  // }

  // async getTodos(): Promise<Todo[]> {
  //   return await this.todoRepository.findAll();
  // }

  // async updateTodo(id: number, todo: Partial<Todo>): Promise<void> {
  //   const existingTodo = await this.todoRepository.findById(id);
  //   if (!existingTodo) {
  //     throw new Error('Todo not found');
  //   }
  //   const updatedTodo = { ...existingTodo, ...todo, updated_at: new Date() };
  //   await this.todoRepository.update(id, updatedTodo);
  // }

  // async deleteTodo(id: number): Promise<void> {
  //   await this.todoRepository.remove(id);
  // }

  getAll(): Promise<TodoEntity[]> {
    return this.todoRepository.getAll();
  }

  get(id: number): Promise<TodoEntity> {
    return this.todoRepository.get(id);
  }

  create(todo: TodoEntity): Promise<TodoEntity> {
    return this.todoRepository.create(todo);
  }

  update(id: number, todo: TodoEntity): Promise<void> {
    return this.todoRepository.update(id, todo);
  }

  remove(id: number): Promise<void> {
    return this.todoRepository.remove(id);
  }
}
