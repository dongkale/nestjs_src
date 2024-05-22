import { Injectable, Inject } from '@nestjs/common';
import { ITodoRepository } from '@/modules/todo/domain/outboundPorts/todo.repository.interface';
import { ITodoService } from '@/modules/todo/domain/inboundPorts/todo.service.interface';
import { Todo } from '@/modules/todo/domain/model/todo.model';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @Inject('ITodoRepository') private readonly todoRepository: ITodoRepository,
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
