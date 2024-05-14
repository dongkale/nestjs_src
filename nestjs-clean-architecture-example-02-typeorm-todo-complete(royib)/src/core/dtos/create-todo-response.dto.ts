import { Todo } from '../entities';

export class CreateTodoResponseDto {
  success?: boolean;

  createdTodo?: Todo;
}
