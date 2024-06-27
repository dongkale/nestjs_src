import { TodoId } from '@/todo/domain/todo.entity';
import { CommonTodoResponse } from '@/todo/application/port/in/dto/response/common-todo-response.dto';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/request/create-todo-request.dto';
import { UpdateTodoBodyRequest } from '@/todo/application/port/in/dto/request/update-todo-body-request.dto';

export const TodoUseCaseSymbol = Symbol('TodoUseCase');

export interface TodoUseCase {
  getTodos(): Promise<CommonTodoResponse>;
  getTodo(todoId: TodoId): Promise<CommonTodoResponse>;
  createTodo(dto: CreateTodoRequest): Promise<CommonTodoResponse>;
  updateTodo(
    todoId: TodoId,
    dto: UpdateTodoBodyRequest,
  ): Promise<CommonTodoResponse>;
  deleteTodo(todoId: TodoId): Promise<CommonTodoResponse>;
}
