import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { GetTodoResponse } from '@/todo/application/port/in/dto/response/get-todo-response.dto';
// import { GetTodosResponse } from '@/todo/application/port/in/dto/response/get-todos-response.dto';

export class CommonTodoResponse {
  @ApiProperty({
    description: '반환 데이터',
    type: [GetTodoResponse],
    name: 'todos',
  })
  @Exclude()
  private readonly _todos: GetTodoResponse[];

  constructor(todos: GetTodoResponse[]) {
    this._todos = todos;
  }

  @Expose()
  get todos() {
    return this._todos;
  }

  static make(todos: GetTodoResponse[]) {
    return new CommonTodoResponse(todos);
  }
}
