// src/application/dto/create-todo.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The content of the todo' })
  content: string;

  @ApiProperty({
    description: 'The completion status of the todo',
    default: false,
  })
  is_done: boolean;
}
