import { BadRequestException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoOrmEntity } from '@/todo/adaptor/out-persistence/todo.typeorm-entity';
import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';
import { TodoMapper } from '@/todo/adaptor/out-persistence/todo.mapper';
import { GetTodoPort } from '@/todo/application/port/out/get-todo.port';
import { GetTodosPort } from '@/todo/application/port/out/get-todos.port';
import { CreateTodoPort } from '@/todo/application/port/out/create-todo.port';
import { UpdateTodoPort } from '@/todo/application/port/out/update-todo.port';
import { DeleteTodoPort } from '@/todo/application/port/out/delete-todo.port';

export class TodoPersistenceAdaptor
  implements
    GetTodosPort,
    GetTodoPort,
    CreateTodoPort,
    UpdateTodoPort,
    DeleteTodoPort
{
  private readonly logger = new Logger(TodoPersistenceAdaptor.name);

  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly todoRepository: Repository<TodoOrmEntity>,
  ) {}

  async getTodos(): Promise<TodoEntity[]> {
    const todos = await this.todoRepository.find();

    this.logger.log(JSON.stringify(todos, null, 2));

    return TodoMapper.mapToTodos(todos);
  }

  async getTodo(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException('Not Found Todo');
    }

    this.logger.log(JSON.stringify(todo, null, 2));

    return TodoMapper.mapToTodo(todo);
  }

  async saveTodo(todo: TodoEntity): Promise<TodoEntity> {
    const todoOrmEntity = TodoMapper.mapToTodoOrmEntity(todo);

    const savedTodo = await this.todoRepository.save(todoOrmEntity);

    this.logger.log(JSON.stringify(savedTodo, null, 2));

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

    this.logger.log(JSON.stringify(updateTodoOrmEntity, null, 2));

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

    if (result.affected === 0) {
      throw new BadRequestException('Bad Request');
    }

    this.logger.log(JSON.stringify(result, null, 2));

    return TodoMapper.mapToTodo(deleteTodoOrmEntity);
  }

  async isExistById(id: TodoId): Promise<boolean> {
    const existOptions = { where: { id } };

    return (await this.todoRepository.count(existOptions)) > 0;
  }
}
