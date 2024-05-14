import { Todo } from '@/core/entities';

export class CreateTodoResponseDto {
  success?: boolean;

  createdTodo?: Todo;
}
