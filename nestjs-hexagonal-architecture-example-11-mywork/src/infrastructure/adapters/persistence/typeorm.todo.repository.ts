import { TodoRepository } from '@/core/ports/todo.repository';
import { Todo } from '@/core/domain/todo';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '@/infrastructure/adapters/persistence/entity/todo.entity';

@Injectable()
export class TypeOrmTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async save(todo: Todo): Promise<Todo> {
    const todoEntity = this.todoRepository.create(todo);
    const savedTodo = await this.todoRepository.save(todoEntity);
    return new Todo(
      savedTodo.id,
      savedTodo.content,
      savedTodo.isDone,
      savedTodo.createdAt,
      savedTodo.updatedAt,
    );
  }

  async findById(id: number): Promise<Todo | null> {
    const todoEntity = await this.todoRepository.findOne({ where: { id } });
    if (!todoEntity) {
      return null;
    }
    return new Todo(
      todoEntity.id,
      todoEntity.content,
      todoEntity.isDone,
      todoEntity.createdAt,
      todoEntity.updatedAt,
    );
  }

  async findAll(): Promise<Todo[]> {
    const todoEntities = await this.todoRepository.find();
    return todoEntities.map(
      (todo) =>
        new Todo(
          todo.id,
          todo.content,
          todo.isDone,
          todo.createdAt,
          todo.updatedAt,
        ),
    );
  }

  async update(id: number, todo: Todo): Promise<void> {
    await this.todoRepository.update(id, todo);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
