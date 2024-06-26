import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoModel } from '@/domain/model/todo';
import { TodoRepository } from '@/domain/repositories/todoRepository.interface';
import { Todo } from '@/infrastructure/entities/todo.entity';

@Injectable()
export class DatabaseTodoRepository implements TodoRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoEntityRepository: Repository<Todo>,
  ) {}

  async updateById(id: number, isDone: boolean): Promise<void> {
    await this.todoEntityRepository.update({ id: id }, { isDone: isDone });
  }
  async insert(todo: TodoModel): Promise<TodoModel> {
    const todoEntity = this.toTodoEntity(todo);
    const result = await this.todoEntityRepository.insert(todoEntity);
    return this.toTodo(result.generatedMaps[0] as Todo);
    // console.log(result.generatedMaps);
  }
  async findAll(): Promise<TodoModel[]> {
    const todosEntity = await this.todoEntityRepository.find();
    return todosEntity.map((todoEntity) => this.toTodo(todoEntity));
  }
  async findById(id: number): Promise<TodoModel> {
    const todoEntity = await this.todoEntityRepository.findOne({ where: { id: id } });
    return this.toTodo(todoEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.todoEntityRepository.delete({ id: id });
  }

  private toTodo(todoEntity: Todo): TodoModel {
    const todo: TodoModel = new TodoModel();

    todo.id = todoEntity.id;
    todo.content = todoEntity.content;
    todo.isDone = todoEntity.isDone;
    todo.createdAt = todoEntity.createdAt;
    todo.updatedAt = todoEntity.updatedAt;

    return todo;
  }

  private toTodoEntity(todo: TodoModel): Todo {
    const todoEntity: Todo = new Todo();

    todoEntity.id = todo.id;
    todoEntity.content = todo.content;
    todoEntity.isDone = todo.isDone;

    return todoEntity;
  }
}
