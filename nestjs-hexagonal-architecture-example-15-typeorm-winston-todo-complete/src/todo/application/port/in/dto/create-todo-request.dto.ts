import { Expose } from 'class-transformer';
import { TodoEntity } from '@/todo/domain/todo.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoRequest {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  content: string;

  constructor() {}

  static of(reqDto: CreateTodoRequest): CreateTodoRequest {
    const dto = new CreateTodoRequest();
    dto.title = reqDto.title;
    dto.content = reqDto.content;
    return dto;
  }

  toEntity(): Partial<TodoEntity> {
    return TodoEntity.createTodo(this.title, this.content);
  }
}
