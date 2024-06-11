import { TodoUseCase } from '@/todo/application/port/in/todo.use-case';
import { TodoPort } from '@/todo/application/port/out/todo.port';
import { GetTodoResponse } from '@/todo/application/port/in/dto/get-todo-res.dto';
import { GetTodosResponse } from '@/todo/application/port/in/dto/get-todos-res.dto';
import { TodoId } from '@/todo/domain/todo.entity';
// import { HandleBoardPort } from '@/board/application/port/out/handle-board.port';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/create-todo-req.dto';
// import { HandleBoardUseCase } from '@/board/application/port/in/handle-board.use-case';
import { UpdateTodoRequest } from '@/todo/application/port/in/dto/update-todo-req.dto';
// import { NotFoundException } from '@nestjs/common';

export class TodoService implements TodoUseCase {
  constructor(private readonly _todoPort: TodoPort) {}
  async getTodos(): Promise<GetTodosResponse> {
    const todos = await this._todoPort.getTodos();

    const todosDto = todos.map((todo) => {
      return new GetTodoResponse(todo);
    });

    // const responseDto = new GetTodosResponse(todosDto);
    // return responseDto;

    return GetTodosResponse.make(todosDto);
  }
  async getTodo(id: TodoId) {
    const todo = await this._todoPort.getTodo(id);
    // const todoDto = new GetTodoResponse(todo);
    // return todoDto;

    return GetTodoResponse.make(todo);
  }

  async createTodo(dto: CreateTodoRequest): Promise<GetTodoResponse> {
    const todoEntity = CreateTodoRequest.of(dto).toEntity();

    const savedTodo = await this._todoPort.saveTodo(todoEntity);

    // const responseDto = new GetTodoResponse(savedTodo);
    // return responseDto;
    return GetTodoResponse.make(savedTodo);
  }

  async updateTodo(
    id: TodoId,
    dto: UpdateTodoRequest,
  ): Promise<GetTodoResponse> {
    const oldBoardEntity = await this._todoPort.getTodo(id);

    const newBoardEntity = UpdateTodoRequest.of(id, dto).toEntity();

    // const mergeBoardEntity = { ...oldBoardEntity, ...newBoardEntity };
    const mergeBoardEntity = Object.assign({}, oldBoardEntity, newBoardEntity);

    await this._todoPort.updateTodo(mergeBoardEntity);

    const savedTodo = await this._todoPort.getTodo(id);

    return GetTodoResponse.make(savedTodo);
  }

  // async updateBoard(id: BoardId, dto: UpdateBoardReq) {
  //   const oldBoardEntity = await this._getBoardPort.getBoard(id);

  //   const newBoardEntity = UpdateBoardReq.of(id, dto).toEntity();

  //   // for (const key in newBoardEntity) {
  //   //   newBoardEntity[key] = newBoardEntity[key] ?? oldBoardEntity[key];
  //   // }

  //   // await this._handleBoardPort.upsertBoard(newBoardEntity);

  //   const mergeBoardEntity = { oldBoardEntity, ...newBoardEntity };

  //   await this._handleBoardPort.upsertBoard(mergeBoardEntity);

  //   const savedBoard = await this._getBoardPort.getBoard(id);

  //   const resDto = new BoardRes(savedBoard);

  //   return resDto;
  // }

  // async deleteBoard(id: BoardId): Promise<null> {
  //   const isExist: boolean = await this._getBoardPort.isExistById(id);

  //   if (!isExist) throw new NotFoundException('해당 id 게시글이 없습니다.');

  //   await this._handleBoardPort.deleteBoard(id);
  //   return null;
  // }
}
