import { TodoId } from '@/domains/entities/todo.entity';
import { TodoUseCase } from '@/domains/ports/in/todo.use-case';
import { GetTodosResponse } from '@/domains/ports/in/dto/response/get-todos-response.dto';
import { GetTodoResponse } from '@/domains/ports/in/dto/response/get-todo-response.dto';
import { CreateTodoRequest } from '@/domains/ports/in/dto/request/create-todo-request.dto';
import { CreateTodoPort } from '@/domains/ports/out/create-todo.port';
import { GetTodosPort } from '@/domains/ports/out/get-todos.port';
import { GetTodoPort } from '@/domains/ports/out/get-todo.port';
import { UpdateTodoPort } from '@/domains/ports/out/update-todo.port';
import { UpdateTodoRequest } from '../ports/in/dto/request/update-todo-request.dto';

export class TodoService implements TodoUseCase {
  constructor(
    private readonly getTodosPort: GetTodosPort,
    private readonly getTodoPort: GetTodoPort,
    private readonly createTodoPort: CreateTodoPort,
    private readonly updateTodoPort: UpdateTodoPort,
  ) {}

  async getTodos(): Promise<GetTodosResponse> {
    const todos = await this.getTodosPort.getTodos();

    const todosDto = todos.map((todo) => {
      return GetTodoResponse.make(todo);
    });

    return GetTodosResponse.make(todosDto);
  }

  async getTodo(id: TodoId): Promise<GetTodoResponse> {
    const todo = await this.getTodoPort.getTodo(id);

    return GetTodoResponse.make(todo);
  }

  async createTodo(dto: CreateTodoRequest): Promise<GetTodoResponse> {
    const todoEntity = CreateTodoRequest.of(dto).toEntity();

    const savedTodo = await this.createTodoPort.saveTodo(todoEntity);

    return GetTodoResponse.make(savedTodo);
  }

  async updateTodo(
    id: TodoId,
    dto: UpdateTodoRequest,
  ): Promise<GetTodoResponse> {
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

    return GetTodoResponse.make(savedTodo);
  }
}
