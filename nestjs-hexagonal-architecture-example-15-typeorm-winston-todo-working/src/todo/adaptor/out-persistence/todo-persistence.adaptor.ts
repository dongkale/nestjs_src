// import { HandleBoardPort } from '@/board/application/port/out/handle-board.port';
// import { GetBoardPort } from '@/board/application/port/out/get-board.port';
// import { TodoCommand } from '@/board/application/port/in/dto/get-boards.command';
import { TodoEntity, TodoId } from '@/todo/domain/todo.entity';
import { TodoPort } from '@/todo/application/port/out/todo.port';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoOrmEntity } from '@/todo/adaptor/out-persistence/todo.orm-entity';
import { Repository } from 'typeorm';
import { TodoMapper } from '@/todo/adaptor/out-persistence/todo.mapper';
import { NotFoundException } from '@nestjs/common';

export class TodoPersistenceAdaptor implements TodoPort {
  constructor(
    @InjectRepository(TodoOrmEntity)
    private readonly _todoRepository: Repository<TodoOrmEntity>,
  ) {}

  async getTodos(): Promise<TodoEntity[]> {
    const todos = await this._todoRepository.find();

    return TodoMapper.mapToTodos(todos);
  }
  async getTodo(id: number): Promise<TodoEntity> {
    const todo = await this._todoRepository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException('Not Found Todo');
    }

    return TodoMapper.mapToTodo(todo);
  }

  async saveTodo(todo: TodoEntity): Promise<TodoEntity> {
    const todoOrmEntity = TodoMapper.mapToTodoOrmEntity(todo);

    const savedTodo = await this._todoRepository.save(todoOrmEntity);

    return TodoMapper.mapToTodo(savedTodo);
  }

  async updateTodo(todo: TodoEntity): Promise<void> {
    const todoOrmEntity = TodoMapper.mapToTodoOrmEntity(todo);
    // await this._todoRepository.upsert(newBoardEntity, ['id']);

    await this._todoRepository.update(todoOrmEntity.id, {
      ...todoOrmEntity,
      updatedAt: new Date(),
    });
  }

  // async deleteBoard(boardId: BoardId): Promise<null> {
  //   const result = await this._boardRepository.softDelete(boardId);
  //   if (!result) {
  //     throw new BadRequestException('잘못된 요청입니다.');
  //   }

  //   // if (result.affected < 1) {
  //   //   throw new BadRequestException('잘못된 요청입니다.');
  //   // }

  //   return null;
  // }

  async isExistById(id: TodoId): Promise<boolean> {
    const existOptions = { where: { id } };

    return await this._todoRepository.exist(existOptions);
  }
}
