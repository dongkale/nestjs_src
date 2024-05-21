// src/infrastructure/adapters/persistence/typeorm/typeorm-todo.repository.ts
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ITodoRepository } from '@/core/interfaces/todo.repository.interface';
import { TodoEntity } from '@/infrastructure/adapters/persistence/typeorm/todo.entity';
import { Todo } from '@/core/entities/todo.entity';

@Injectable()
export class TypeOrmTodoRepository implements ITodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly repository: Repository<TodoEntity>,
  ) {}

  async getAll(): Promise<Todo[]> {
    const entities = await this.repository.find();
    return entities.map(
      (entity) =>
        new Todo(
          entity.id,
          entity.content,
          entity.isDone,
          entity.createdAt,
          entity.updatedAt,
        ),
    );
  }

  async get(id: number): Promise<Todo> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new Error('Todo not found');
    }
    return new Todo(
      entity.id,
      entity.content,
      entity.isDone,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async create(todo: Todo): Promise<Todo> {
    const entity = this.repository.create(todo);
    const savedEntity = await this.repository.save(entity);
    return new Todo(
      savedEntity.id,
      savedEntity.content,
      savedEntity.isDone,
      savedEntity.createdAt,
      savedEntity.updatedAt,
    );
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.repository.update(id, todo);
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new Error('Todo not found');
    }
    return new Todo(
      entity.id,
      entity.content,
      entity.isDone,
      entity.createdAt,
      entity.updatedAt,
    );
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
