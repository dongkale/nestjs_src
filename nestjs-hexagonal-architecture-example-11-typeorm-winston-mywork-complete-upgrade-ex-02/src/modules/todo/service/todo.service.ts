import { Injectable, Inject } from '@nestjs/common';
import { ITodoRepository } from '@/modules/todo/outbound-port/todo.repository.interface';
import { ITodoService } from '@/modules/todo/inbound-port/todo.service.interface';
import { Todo } from '@/modules/todo/models/todo.model';

@Injectable()
export class TodoService implements ITodoService {
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
    const todo = new Todo(0, content, false, new Date(), new Date());
    return this.todoRepository.create(todo);
  }

  async update(id: number, content: string, isDone: boolean): Promise<Todo> {
    return await this.todoRepository.update(id, {
      content,
      isDone,
      updatedAt: new Date(),
    });
  }

  async remove(id: number): Promise<void> {
    return await this.todoRepository.remove(id);
  }
}
