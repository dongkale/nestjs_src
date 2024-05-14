import { Injectable } from '@nestjs/common';
import { Todo } from '@/core/entities';
import { IDataServices } from '@/core/abstracts';

@Injectable()
export class TodoUseCases {
  constructor(private dataServices: IDataServices) {}

  getAllTodo(): Promise<Todo[]> {
    return this.dataServices.todos.getAll();
  }

  getTodoById(id: any): Promise<Todo | null> {
    return this.dataServices.todos.getOne(id);
  }

  async createTodo(todo: Todo): Promise<Todo> {
    try {
      const createdTodo = await this.dataServices.todos.create(todo);

      return createdTodo;
    } catch (error) {
      throw error;
    }
  }

  updateTodo(todoId: string, todo: Todo): Promise<Todo | null> {
    return this.dataServices.todos.update(todoId, todo);
  }
}
