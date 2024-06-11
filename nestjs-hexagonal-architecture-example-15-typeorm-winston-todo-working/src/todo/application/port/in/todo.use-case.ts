import { TodoId } from '@/todo/domain/todo.entity';
import { GetTodoResponse } from '@/todo/application/port/in/dto/get-todo-res.dto';
import { GetTodosResponse } from '@/todo/application/port/in/dto/get-todos-res.dto';
import { CreateTodoRequest } from '@/todo/application/port/in/dto/create-todo-req.dto';
import { UpdateTodoBodyRequest } from '@/todo/application/port/in/dto/update-todo-body-req.dto';

export const TodoUseCaseSymbol = Symbol('TodoUseCase');

export interface TodoUseCase {
  getTodos(): Promise<GetTodosResponse>;
  getTodo(todoId: TodoId): Promise<GetTodoResponse>;
  createTodo(dto: CreateTodoRequest): Promise<GetTodoResponse>;
  updateTodo(id: TodoId, dto: UpdateTodoBodyRequest): Promise<GetTodoResponse>;
  // deleteBoard(id: TodoId): Promise<void>;
}
