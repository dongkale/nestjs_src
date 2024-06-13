/* eslint-disable @typescript-eslint/no-empty-function */
import { Expose } from 'class-transformer';
import { TodoEntity } from '@/todo/domains/entities/todo.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { UpdateTodoBodyRequest } from '@/todo/domains/ports/in/dto/request/update-todo-body-request.dto';

export class UpdateTodoRequest extends UpdateTodoBodyRequest {
  @Expose()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  constructor() {
    super();
  }

  static of(id: number, reqDto: UpdateTodoRequest): UpdateTodoRequest {
    const dto = new UpdateTodoRequest();
    dto.id = id;
    dto.title = reqDto?.title;
    dto.content = reqDto?.content;
    return dto;
  }

  toEntity(): Partial<TodoEntity> {
    return TodoEntity.updateTodo(this.title, this.content, this.id);
  }
}
