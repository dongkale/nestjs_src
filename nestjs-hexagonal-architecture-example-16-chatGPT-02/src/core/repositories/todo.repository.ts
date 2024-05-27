import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITodoRepository } from '@/core/interfaces/todo-repository.interface';
import { Todo } from '@/core/domain/todo.entity';

@Injectable()
export class TodoRepository implements ITodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.repository.find();
  }

  async findOne(id: string): Promise<Todo> {
    return this.repository.findOne({ where: { id } });
  }

  async create(todo: Todo): Promise<Todo> {
    return this.repository.save(todo);
  }

  async update(id: string, todo: Todo): Promise<void> {
    await this.repository.update(id, todo);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
