import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../../core/domain/todo.entity';
import { ITodoService } from '../interfaces/itodo-service.interface';

@Injectable()
export class TodoService implements ITodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  createTodo(content: string): Promise<Todo> {
    const todo = this.todoRepository.create({ content });
    return this.todoRepository.save(todo);
  }

  getAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async updateTodo(
    id: number,
    content: string,
    isDone: boolean,
  ): Promise<Todo> {
    await this.todoRepository.update(id, { content, isDone });
    return this.todoRepository.findOne(id);
  }

  deleteTodo(id: number): Promise<void> {
    return this.todoRepository.delete(id).then(() => {});
  }
}
