// src/application/dto/update-todo.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiProperty({ description: 'The content of the todo' })
  content: string;

  @ApiProperty({
    description: 'The completion status of the todo',
    default: false,
  })
  is_done: boolean;
}
