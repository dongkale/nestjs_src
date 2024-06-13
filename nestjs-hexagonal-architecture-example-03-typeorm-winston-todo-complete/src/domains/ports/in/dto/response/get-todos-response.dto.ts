import { Exclude, Expose } from 'class-transformer';
import { GetTodoResponse } from '@/domains/ports/in/dto/response/get-todo-response.dto';

export class GetTodosResponse {
  @Exclude() private readonly _todos: GetTodoResponse[];

  constructor(todos: GetTodoResponse[]) {
    this._todos = todos;
  }

  @Expose() get todos() {
    return this._todos;
  }

  static make(todos: GetTodoResponse[]) {
    return new GetTodosResponse(todos);
  }
}
