import { Injectable, Inject, Logger } from '@nestjs/common';
import { ITodoRepository } from '@/core/interfaces/todo.repository.interface';
import { ITodoService } from '@/core/interfaces/todo.service.interface';
import { Todo } from '@/core/models/todo.model';

@Injectable()
export class TodoService implements ITodoService {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @Inject(ITodoRepository) private readonly todoRepository: ITodoRepository,
  ) {}

  async getAll(): Promise<Todo[]> {
    return this.todoRepository.getAll();
  }

  async get(id: number): Promise<Todo> {
    return this.todoRepository.get(id);
  }

  async create(content: string): Promise<Todo> {
    // const todo = new Todo(0, content, false, new Date(), new Date());
    const todo = Todo.make(0, content, false, new Date(), new Date());
    return this.todoRepository.create(todo);
  }

  async update(id: number, content: string, isDone: boolean): Promise<Todo> {
    return await this.todoRepository.update(id, {
      content,
      isDone,
      updatedAt: new Date(),
    });
  }

  async remove(id: number): Promise<Todo> {
    return await this.todoRepository.remove(id);
  }
}
