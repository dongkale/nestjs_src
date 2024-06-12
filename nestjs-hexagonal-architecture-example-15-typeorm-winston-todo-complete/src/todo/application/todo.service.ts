import { TodoUseCase } from '@/todo/application/port/in/todo.use-case';
import { TodoPort } from '@/todo/application/port/out/todo.port';
import { GetTodoResponse } from '@/todo/application/port/in/dto/get-todo-response.dto';
import { GetTodosResponse } from '@/todo/application/port/in/dto/get-todos-response.dto';
import { TodoId } from '@/todo/domain/todo.entity';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/create-todo-request.dto';
import { UpdateTodoRequest } from '@/todo/application/port/in/dto/update-todo-request.dto';
import { NotFoundException } from '@nestjs/common';

export class TodoService implements TodoUseCase {
  constructor(private readonly todoPort: TodoPort) {}
  async getTodos(): Promise<GetTodosResponse> {
    const todos = await this.todoPort.getTodos();

    const todosDto = todos.map((todo) => {
      return GetTodoResponse.make(todo);
    });

    // const responseDto = new GetTodosResponse(todosDto);
    // return responseDto;

    return GetTodosResponse.make(todosDto);
  }
  async getTodo(id: TodoId): Promise<GetTodoResponse> {
    const todo = await this.todoPort.getTodo(id);
    // const todoDto = new GetTodoResponse(todo);
    // return todoDto;

    return GetTodoResponse.make(todo);
  }

  async createTodo(dto: CreateTodoRequest): Promise<GetTodoResponse> {
    const todoEntity = CreateTodoRequest.of(dto).toEntity();

    const savedTodo = await this.todoPort.saveTodo(todoEntity);

    // const responseDto = new GetTodoResponse(savedTodo);
    // return responseDto;
    return GetTodoResponse.make(savedTodo);
  }

  async updateTodo(
    id: TodoId,
    dto: UpdateTodoRequest,
  ): Promise<GetTodoResponse> {
    const oldTodoEntity = await this.todoPort.getTodo(id);

    const newTodoEntity = UpdateTodoRequest.of(id, dto).toEntity();

    const mergeTodoEntity = { ...oldTodoEntity, ...newTodoEntity };

    // 클래스 복사
    // const mergeTodoEntity = Object.assign(
    //   Object.create(Object.getPrototypeOf(newTodoEntity)),
    //   newTodoEntity,
    //   oldTodoEntity,
    // );

    await this.todoPort.updateTodo(mergeTodoEntity);

    const savedTodo = await this.todoPort.getTodo(id);

    return GetTodoResponse.make(savedTodo);
  }

  async deleteTodo(id: TodoId): Promise<GetTodoResponse> {
    const isExist: boolean = await this.todoPort.isExistById(id);

    if (!isExist) {
      throw new NotFoundException('Not found Todo');
    }

    const deleteTodo = await this.todoPort.deleteTodo(id);

    return GetTodoResponse.make(deleteTodo);
  }
}
