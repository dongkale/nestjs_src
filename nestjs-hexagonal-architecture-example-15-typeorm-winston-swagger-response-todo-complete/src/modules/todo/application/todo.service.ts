import { NotFoundException, Logger } from '@nestjs/common';
import { TodoUseCase } from '@/todo/application/port/in/todo.use-case';
import { GetTodoPort } from '@/todo/application/port/out/get-todo.port';
import { GetTodosPort } from '@/todo/application/port/out/get-todos.port';
import { CreateTodoPort } from '@/todo/application/port/out/create-todo.port';
import { UpdateTodoPort } from '@/todo/application/port/out/update-todo.port';
import { DeleteTodoPort } from '@/todo/application/port/out/delete-todo.port';
import { GetTodoResponse } from '@/todo/application/port/in/dto/response/get-todo-response.dto';
import { CommonTodoResponse } from '@/todo/application/port/in/dto/response/common-todo-response.dto';
import { TodoId } from '@/todo/domain/todo.entity';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/request/create-todo-request.dto';
import { UpdateTodoRequest } from '@/todo/application/port/in/dto/request/update-todo-request.dto';

export class TodoService implements TodoUseCase {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    private readonly getTodoPort: GetTodoPort,
    private readonly getTodosPort: GetTodosPort,
    private readonly createTodoPort: CreateTodoPort,
    private readonly updateTodoPort: UpdateTodoPort,
    private readonly deleteTodoPort: DeleteTodoPort,
  ) {}

  async getTodos(): Promise<CommonTodoResponse> {
    const todos = await this.getTodosPort.getTodos();

    const todosDto = todos.map((todo) => {
      return GetTodoResponse.make(todo);
    });

    return CommonTodoResponse.make(todosDto);
  }

  async getTodo(id: TodoId): Promise<CommonTodoResponse> {
    const todo = await this.getTodoPort.getTodo(id);

    // return GetTodoResponse.make(todo);
    return CommonTodoResponse.make([GetTodoResponse.make(todo)]);
  }

  async createTodo(dto: CreateTodoRequest): Promise<CommonTodoResponse> {
    const todoEntity = CreateTodoRequest.of(dto).toEntity();

    const savedTodo = await this.createTodoPort.saveTodo(todoEntity);

    // return GetTodoResponse.make(savedTodo);
    return CommonTodoResponse.make([GetTodoResponse.make(savedTodo)]);
  }

  async updateTodo(
    id: TodoId,
    dto: UpdateTodoRequest,
  ): Promise<CommonTodoResponse> {
    const oldTodoEntity = await this.getTodoPort.getTodo(id);

    const newTodoEntity = UpdateTodoRequest.of(id, dto).toEntity();

    const mergeTodoEntity = { ...oldTodoEntity, ...newTodoEntity };

    // 클래스 복사
    // const mergeTodoEntity = Object.assign(
    //   Object.create(Object.getPrototypeOf(newTodoEntity)),
    //   newTodoEntity,
    //   oldTodoEntity,
    // );

    await this.updateTodoPort.updateTodo(mergeTodoEntity);

    const savedTodo = await this.getTodoPort.getTodo(id);

    // return GetTodoResponse.make(savedTodo);
    return CommonTodoResponse.make([GetTodoResponse.make(savedTodo)]);
  }

  async deleteTodo(id: TodoId): Promise<CommonTodoResponse> {
    const isExist: boolean = await this.deleteTodoPort.isExistById(id);

    if (!isExist) {
      throw new NotFoundException('Not found Todo');
    }

    const deleteTodo = await this.deleteTodoPort.deleteTodo(id);

    // return GetTodoResponse.make(deleteTodo);
    return CommonTodoResponse.make([GetTodoResponse.make(deleteTodo)]);
  }
}
