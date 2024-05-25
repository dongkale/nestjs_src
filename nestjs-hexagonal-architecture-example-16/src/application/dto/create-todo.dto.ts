// src/application/dto/create-todo.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
