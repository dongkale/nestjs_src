// src/infrastructure/repositories/typeorm-todo.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ITodoRepository } from '@/domain/ports/itodo.repository';
import { Todo } from '@/domain/models/todo.model';
// import { TodoEntity } from '@/domain/entities/todo.entity';

@Injectable()
export class TypeOrmTodoRepository implements ITodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
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

  async findById(id: number): Promise<Todo> {
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
    return this.repository.save(todo);
  }

  async update(id: number, todo: Todo): Promise<Todo> {
    await this.repository.update(id, todo);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
