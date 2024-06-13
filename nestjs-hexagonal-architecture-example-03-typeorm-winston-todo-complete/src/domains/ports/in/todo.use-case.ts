import { TodoId } from '@/domains/entities/todo.entity';
import { GetTodoResponse } from '@/domains/ports/in/dto/response/get-todo-response.dto';
import { GetTodosResponse } from '@/domains/ports/in/dto/response/get-todos-response.dto';
import { CreateTodoRequest } from '@/domains/ports/in/dto/request/create-todo-request.dto';
import { UpdateTodoBodyRequest } from '@/domains/ports/in/dto/request/update-todo-body-request.dto';

export const TodoUseCaseSymbol = Symbol('TodoUseCaseSymbol');

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
