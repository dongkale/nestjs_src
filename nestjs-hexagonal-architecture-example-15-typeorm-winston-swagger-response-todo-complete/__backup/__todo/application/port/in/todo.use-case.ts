import { TodoId } from '@/todo/domain/todo.entity';
import { GetTodoResponse } from '@/todo/application/port/in/dto/response/get-todo-response.dto';
import { GetTodosResponse } from '@/todo/application/port/in/dto/response/get-todos-response.dto';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/request/create-todo-request.dto';
import { UpdateTodoBodyRequest } from '@/todo/application/port/in/dto/request/update-todo-body-request.dto';

export const TodoUseCaseSymbol = Symbol('TodoUseCase');

export interface TodoUseCase {
  getTodos(): Promise<GetTodosResponse>;
  getTodo(todoId: TodoId): Promise<GetTodoResponse>;
  createTodo(dto: CreateTodoRequest): Promise<GetTodoResponse>;
  updateTodo(
    todoId: TodoId,
    dto: UpdateTodoBodyRequest,
  ): Promise<GetTodoResponse>;
  deleteTodo(todoId: TodoId): Promise<GetTodoResponse>;
}
