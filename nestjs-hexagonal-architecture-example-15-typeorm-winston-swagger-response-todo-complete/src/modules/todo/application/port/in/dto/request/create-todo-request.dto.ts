import { Expose } from 'class-transformer';
import { TodoEntity } from '@/todo/domain/todo.entity';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoRequest {
  @ApiProperty({ description: '제목' })
  @Expose()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: '내용' })
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
