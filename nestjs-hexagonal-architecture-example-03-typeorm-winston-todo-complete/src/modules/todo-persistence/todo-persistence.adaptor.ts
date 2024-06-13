import { TodoEntity, TodoId } from '@/domains/entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoOrmEntity } from '@/modules/todo-persistence/todo.orm-entity';
import { Repository } from 'typeorm';
import { TodoMapper } from '@/modules/todo-persistence/todo.mapper';
import { CreateTodoPort } from '@/domains/ports/out/create-todo.port';
import { GetTodosPort } from '@/domains/ports/out/get-todos.port';
import { GetTodoPort } from '@/domains/ports/out/get-todo.port';
import { UpdateTodoPort } from '@/domains/ports/out/update-todo.port';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class TodoPersistenceAdaptor
  implements GetTodosPort, GetTodoPort, CreateTodoPort, UpdateTodoPort
{
  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly todoRepository: Repository<TodoOrmEntity>,
  ) {}

  async getTodos(): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find();

    return TodoMapper.mapToTodos(todos);
  }

  async getTodo(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException('Not Found Todo');
    }

    return TodoMapper.mapToTodo(todo);
  }

  async saveTodo(todo: TodoEntity): Promise<TodoEntity> {
    const todoOrmEntity = TodoMapper.mapToTodoOrmEntity(todo);

    const savedTodo = await this.todoRepository.save(todoOrmEntity);

    return TodoMapper.mapToTodo(savedTodo);
  }

  async updateTodo(todoEntity: TodoEntity): Promise<TodoEntity> {
    const todoOrmEntity = TodoMapper.mapToTodoOrmEntity(todoEntity);

    await this.todoRepository.update(todoOrmEntity.id, {
      ...todoOrmEntity,
      updatedAt: new Date(),
    });

    const updateTodoOrmEntity = await this.todoRepository.findOneBy({
      id: todoOrmEntity.id,
    });
    if (!updateTodoOrmEntity) {
      throw new NotFoundException('Not Found Todo');
    }

    return TodoMapper.mapToTodo(updateTodoOrmEntity);
  }

  async deleteTodo(todoId: TodoId): Promise<TodoEntity> {
    const deleteTodoOrmEntity = await this.todoRepository.findOneBy({
      id: todoId,
    });
    if (!deleteTodoOrmEntity) {
      throw new NotFoundException('Not Found Todo');
    }

    const result = await this.todoRepository.softDelete(todoId);
    if (!result) {
      throw new BadRequestException('Bad Request');
    }

    // if (result.affected < 1) {
    //   throw new BadRequestException('잘못된 요청입니다.');
    // }

    return TodoMapper.mapToTodo(deleteTodoOrmEntity);
  }

  async isExistById(id: TodoId): Promise<boolean> {
    const existOptions = { where: { id } };

    return (await this.todoRepository.count(existOptions)) > 0;
  }
}
